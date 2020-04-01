from django.urls import include, path
from apps.twitter import views


urlpatterns = [path("tweets/", views.TwitterView.as_view(), name="twitter")]
