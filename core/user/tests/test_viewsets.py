from rest_framework import status

from core.fixtures.user import user
from core.fixtures.post import post

class TestUserViewSet:

    endpoint = "/api/user/"

    def test_list(self,client,user):
        """Test list of users."""
        client.force_authenticate(user=user)
        response = client.get(self.endpoint)
        assert response.status_code == status.HTTP_200_OK
        assert response.data["count"] == 1

    
    def test_retrieve(self,client,user):
        """Test retrieve a single user by id."""
        client.force_authenticate(user=user)
        response = client.get(self.endpoint + str(user.public_id) + "/")

        assert response.status_code == status.HTTP_200_OK
        assert response.data["id"] == user.public_id.hex
        assert response.data["username"] == user.username
        assert response.data["email"] == user.email

    def test_create(self,client,user):
        """Test create new user with valid payload."""
        client.force_authenticate(user=user)
        data={}

        response = client.post(self.endpoint,data)
        assert response.status_code == status.HTTP_405_METHOD_NOT_ALLOWED

    def test_update(self,client,user):
        """Test update an existing user's profile information using PATCH request method and valid payload."""
        client.force_authenticate(user=user)
        data={
            "username":"test_user_updated",

        }
        response =client.patch(self.endpoint + str(user.public_id) + "/",data)
        assert response.status_code == status.HTTP_200_OK
        assert response.data["username"]== data["username"]




