from django.conf.urls.defaults import patterns, include, url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()
import os
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

urlpatterns += patterns('django.views.static',
    (r'^static/(?P<path>.*)$',
     'serve', {
        'document_root': os.path.abspath('./static/'),
        'show_indexes': True }),)