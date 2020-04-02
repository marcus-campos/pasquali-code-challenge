from django.shortcuts import render
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics
from rest_framework.response import Response

from .services import Insights, Twitter


class TwitterView(generics.GenericAPIView):
    pagination_class = None
    serializer_class = None

    get_operation_description = """
        Referência: https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets
        Parametros permitidos: 'q', 'lang', 'locale', 'since_id', 'geocode', 'max_id', 'until', 'result_type', 'count', 'include_entities'
    """

    @swagger_auto_schema(operation_description=get_operation_description)
    def get(self, request, *args, **kwargs):
        twitter = Twitter()
        result = twitter.search(request.query_params)
        data = result.json()
        insights = Insights(data).generate(
            [
                "lang as Idiomas",
                "entities.hashtags.*.text as Hashtags",
                "entities.user_mentions.*.screen_name as Menções",
            ]
        )
        data["insights"] = insights
        return Response(data=data, status=200)
