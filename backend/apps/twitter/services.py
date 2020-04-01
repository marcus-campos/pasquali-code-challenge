import copy

import requests
import six
from django.conf import settings


class TwitterError(Exception):
    def __init__(self, reason, response=None, api_code=None):
        self.reason = six.text_type(reason)
        self.response = response
        self.api_code = api_code
        super(TwitterError, self).__init__(reason)

    def __str__(self):
        return self.reason


class TwitterAuth:
    OAUTH_HOST = settings.TWITTER["HOST"]
    OAUTH_ROOT = "/oauth2/"

    def __init__(self, consumer_key, consumer_secret):
        self.consumer_key = consumer_key
        self.consumer_secret = consumer_secret
        self._bearer_token = ""

        resp = requests.post(
            self._get_oauth_url("token"),
            auth=(self.consumer_key, self.consumer_secret),
            data={"grant_type": "client_credentials"},
        )
        data = resp.json()
        if data.get("token_type") != "bearer":
            raise TwitterError(
                'Expected token_type to equal "bearer", ' "but got %s instead" % data.get("token_type")
            )

        self._bearer_token = data["access_token"]

    def _get_oauth_url(self, endpoint):
        return "https://" + self.OAUTH_HOST + self.OAUTH_ROOT + endpoint


class Twitter:
    TWITTER_HOST = settings.TWITTER["HOST"]
    TWITTER_API_VERSION = "/1.1/"

    def __init__(self):
        self.AUTH = self.__auth()

    def search(self, params):
        """ :reference: https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets
            :allowed_param:'q', 'lang', 'locale', 'since_id', 'geocode',
             'max_id', 'until', 'result_type', 'count',
              'include_entities'
        """
        return self.__request(params)

    def __request(self, params):
        auth = self.AUTH
        endpoint = "/search/tweets.json"
        url = self._get_url(endpoint)

        headers = {"Authorization": "Bearer " + auth._bearer_token}

        result = requests.get(url, params=params, headers=headers)
        return result

    def _get_url(self, endpoint):
        return "https://" + self.TWITTER_HOST + self.TWITTER_API_VERSION + endpoint

    def __auth(self):
        consumer_key = settings.TWITTER["CONSUMER_KEY"]
        consumer_secret = settings.TWITTER["CONSUMER_SECRET"]
        auth = TwitterAuth(consumer_key, consumer_secret)
        return auth


class Insights:
    def __init__(self, data):
        self.data = data

    def generate(self, keys):
        insights = {}

        for tweet in self.data["statuses"]:
            for key in keys:
                aux_tweet = copy.deepcopy(tweet)
                split = key.split(".")

                is_list = False
                if len(split) > 1:
                    for deep_key in split:
                        if is_list:
                            key = deep_key
                            break

                        if deep_key == "*":
                            is_list = True
                            continue

                        if deep_key in aux_tweet:
                            aux_tweet = aux_tweet[deep_key]
                            key = deep_key

                if is_list:
                    for item in aux_tweet:
                        insights = self.__get_insights(key, item, insights)
                else:
                    insights = self.__get_insights(key, aux_tweet, insights)

        return insights

    def __is_classified(self, value):
        classify = False

        if type(value) is str:
            classify = True

        return classify

    def __get_insight(self, insights, key, value, classify):
        if key in insights:
            if classify:
                if value in insights[key]:
                    insights[key][value] += 1
                else:
                    insights[key][value] = 1
        else:
            if classify:
                insights[key] = {}
                insights[key][value] = 1
            else:
                insights[key] = 1

        return insights

    def __get_insights(self, key, tweet, insights):
        split = key.split(" as ")
        insights = copy.deepcopy(insights)

        new_key = ""
        if len(split) > 1:
            key = split[0]
            new_key = split[1]

        if key in tweet:
            value = tweet[key]
            classify = self.__is_classified(value)
            insights = self.__get_insight(insights, key, value, classify)

        if new_key:
            if not new_key in insights:
                insights[new_key] = {}
            insights[new_key] = {
                k: insights[new_key].get(k, 0) + insights[key].get(k, 0)
                for k in set(insights[new_key]) | set(insights[key])
            }
            del insights[key]

        return insights
