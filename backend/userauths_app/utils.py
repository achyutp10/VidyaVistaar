from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMessage
from django.conf import settings


def send_verification_email(request, user, mail_subject, email_template):
  from_email = settings.DEFAULT_FROM_EMAIL
  current_site = get_current_site(request)
  message = render_to_string(email_template, {
    'user': user,
    'domain': current_site,
    'uid': urlsafe_base64_encode(force_bytes(user.pk)),
    'token': default_token_generator.make_token(user),
  })
  to_email = user.email
  mail = EmailMessage(mail_subject, message, from_email, to=[to_email])
  mail.content_subtype = 'html'
  mail.send()


  # 

import requests
import urllib
import jwt
import os

from oauth2client import client
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def get_id_token_with_code_method_1(code):
    redirect_uri = "postmessage"
    token_endpoint = "https://oauth2.googleapis.com/token"
    payload = {
        'code': code,
        'client_id': '24448671049-m8rpn9uh13jpreah92mhvd6q69kou69c.apps.googleusercontent.com',
        'client_secret': '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',
        'redirect_uri': redirect_uri,
        'grant_type': 'authorization_code',
    }

    body = urllib.parse.urlencode(payload)
    headers = {
        'content-type': 'application/x-www-form-urlencoded',
    }

    response = requests.post(token_endpoint, data=body, headers=headers)
    if response.ok:
        data = response.json()
        if 'id_token' in data:
            id_token = data['id_token']
            return jwt.decode(id_token, options={"verify_signature": False})
        else:
            print("Missing id_token in response:", data)
            return None
    else:
        print("Error fetching id_token:", response.json())
        return None

# def get_id_token_with_code_method_1(code):
#     redirect_uri = "postmessage"
#     token_endpoint = "https://oauth2.googleapis.com/token"
#     payload = {
#         'code': code,
#         'client_id': '24448671049-m8rpn9uh13jpreah92mhvd6q69kou69c.apps.googleusercontent.com',
#         'client_secret': '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',
#         'redirect_uri': redirect_uri,
#         'grant_type': 'authorization_code',
#     }

#     body = urllib.parse.urlencode(payload)
#     headers = {
#         'content-type': 'application/x-www-form-urlencoded',
#     }

#     response = requests.post(token_endpoint, data=body, headers=headers)
#     if response.ok:
#         id_token = response.json()['id_token']
#         return jwt.decode(id_token, options={"verify_signature": False})
#     else:
#         print(response.json())
#         return None


def get_id_token_with_code_method_2(code):
    CLIENT_SECRET_FILE = 'client_secret.json'

    # Exchange auth code for access token, refresh token, and ID token
    credentials = client.credentials_from_clientsecrets_and_code(
        CLIENT_SECRET_FILE,
        ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile', 'openid', 'email', 'profile'],
        code
    )
    
    return credentials.id_token

