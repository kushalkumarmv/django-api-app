
import pytest
from rest_framework import status


from core.fixtures.user import user




class TestAuthenticationViewSet:

    endpoint= "/api/auth/"

    @pytest.mark.django_db
    def test_login(self,client, user):
        data ={
            "username": user.username,
            "password":"test_password",
            "email":"test@gmail.com"
        }
        response =client.post(self.endpoint + "login/", data)
        print(response.content)

        assert response.status_code == status.HTTP_200_OK

        assert response.data["access"]
        assert response.data["user"]["id"] == user.public_id.hex
        assert response.data["user"]["username"] == user.username
        assert response.data["user"]["email"] == user.email
    
    @pytest.mark.django_db
    def test_register(self,client):
        data ={
            "username":"jhondoe",
            "email":"johndoe@yopmail.com",
            "password":"test_password",
            "first_name":"jhon",
            "last_name":"Doe"

        }
        response = client.post(self.endpoint + "register/",data)
        assert response.status_code == status.HTTP_201_CREATED

    @pytest.mark.django_db
    def test_refresh(self,client,user):
        data ={
            "username":user.username,
            "password":"test_password",
            "email":"test@gmail.com"

        }
        response = client.post(self.endpoint + "login/",data)

        assert response.status_code == status.HTTP_200_OK

        data_refresh ={
            "refresh":response.data["refresh"]

        }
        response = client.post(self.endpoint + "refresh/",data_refresh)

        assert response.status_code == status.HTTP_200_OK
        assert response.data["access"]