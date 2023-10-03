
from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager,PermissionsMixin,UserManager
from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404
import uuid
from core.abstract.models import AbstractModel, AbstractManager



def user_directory_path(instance, filename):
    # file will be uploaded to   MEDIA_ROOT/user_<id>/<filename>
    return 'user_{0}/{1}'.format(instance.public_pk,filename)

class User(AbstractBaseUser,AbstractModel,PermissionsMixin):
    username = models.CharField(max_length=255, unique=True) 
    first_name= models.CharField(max_length=255)
    last_name= models.CharField(max_length=255)
    email =models.EmailField(db_index=True,unique=True)
    post_liked =models.ManyToManyField("core_post.Post",related_name="liked_by")
    is_active= models.BooleanField(default=True)
    is_superuser= models.BooleanField(default=False)
    is_staff= models.BooleanField(default=False)
    
    avatar=models.ImageField(null=True,blank=True,upload_to=user_directory_path)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    objects = UserManager()


    def __str__(self):
        return f"{self.email}"
    
    @property
    def name(self):
        return f"{self.first_name} {self.last_name}"
    

    def like(self,post):
        """like 'post' if it hasn't been done yet"""
        return self.posts_liked.add(post)
    
    def remove_like(self,post):
        """remove a like from post"""
        return self.posts_liked.remove(post)
    
    def has_liked(self,post):
        """Return true if the user has liked a 'post' else False"""
        return self.posts_liked.filter(pk=post.pk).exists()
    

class UserManager(BaseUserManager,AbstractManager):
    def get_object_by_public_id(self, public_id):
        try:
            instance = self.get(public_id=public_id)
            return instance
        except (ObjectDoesNotExist, ValueError, TypeError):
            return Http404

    
    def create_user(self, username,email,password=None,**kwargs):
        """Create aand returns a 'User'  with an eamil,phone,number,username and password"""
        if username is None:
            raise TypeError('Users must have a username')
        if email is None:
            raise TypeError('Users must have a email')
        if password is None:
            raise TypeError('Users must have a password')
        user =self.model(username=username,email=self.normalize_email(email),**kwargs )
        user.set_password(password)
        user.save(using=self._db)

        return user
        
        
    def create_superuser(self, username,email,password,**kwargs):
        """Create and reurn a 'User' with  superuser(admin) permissions."""
        if password is None:
            raise TypeError('Superuser must have a password')
        if email is None:
            raise TypeError('Superuser must have email')
        if username is None:
            raise TypeError('Superuser must have an username')
            
        user =self.create_user(username,email,password,**kwargs)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self.db)

        return user
                