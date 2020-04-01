from django.shortcuts import render
from rest_framework import filters, generics
from rest_framework.response import Response

from .services import Twitter, Insights


class TwitterView(generics.GenericAPIView):
    filter_backends = [filters.SearchFilter]

    def get(self, request, *args, **kwargs):
        twitter = Twitter()
        result = twitter.search({"q": request.query_params["search"], "count": 100})
        data = result.json()
        insights = Insights(data).generate(
            [
                "lang",
                "entities.hashtags.*.text as hashtags",
                "entities.user_mentions.*.screen_name as user_mentions",
                "source"
            ]
        )
        data["insights"] = insights
        return Response(data=data, status=200)
