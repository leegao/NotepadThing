# Create your views here.
from django.shortcuts import render_to_response

from django.http import HttpResponse
from models import *
import json

def index(request):
    return render_to_response('template.html')

def get(request, uid):
    # return the full text in json
    doc = Document.objects.filter(id = uid)
    if doc:
        # doc exists, return json dump of doc.cells
        return HttpResponse(json.dumps(doc[0].cells()))
    else:
        # idk
        return HttpResponse(json.dumps(None))

def update(request, uid, pid):
    # take POST data
    doc = Document.objects.filter(id = uid)
    text = None;
    code = None;
    try:
        text = request.REQUEST['text']
        code = int(request.REQUEST['code'])
    except:
        return HttpResponse(json.dumps(None))
    if doc:
        # doc exists
        doc = doc[0]
        cell = Cell.objects.filter(document = doc, id = pid)
        if cell:
            # update old one
            cell = cell[0]
            cell.code = code
            cell.raw_text = text
            cell.save()
        else:
            # create new one
            cell = Cell(document = doc, code = code, raw_text = text)
            cell.save()
            pid = cell.id
        return HttpResponse(json.dumps(pid))
    else:
        # idk
        return HttpResponse(json.dumps(None))

def poll(request, uid, pid):
    doc = Document.objects.filter(id = uid)
    if doc:
        # doc exists
        doc = doc[0]
        cell = Cell.objects.filter(document = doc, id = pid)
        if cell:
            # return cell
            cell = cell[0]
            return HttpResponse(json.dumps(cell.cell()))
        else:
            # cell not found
            return HttpResponse(json.dumps(None))
    else:
        # doc not found
        return HttpResponse(json.dumps(None))