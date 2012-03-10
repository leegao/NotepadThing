from django.conf.urls.defaults import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'notepad.views.home', name='home'),
    # url(r'^notepad/', include('notepad.foo.urls')),

    url(r'^get/(?P<uid>\d+)/$', 'note.views.get'),
    url(r'^update/(?P<uid>\d+)/(?P<pid>\d+)/$', 'note.views.update'),
    url(r'^poll/(?P<uid>\d+)/(?P<pid>\d+)/$', 'note.views.poll'),
    url(r'^index','note.views.index'),

    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)
