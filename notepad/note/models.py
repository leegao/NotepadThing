from django.db import models

# Create your models here.
class Document(models.Model):
    pub_date = models.DateTimeField()

    def __str__(self):
        return str(self.uid())

    def uid(self):
        return self.id

    def cells(self):
        l = []
        for cell in Cell.objects.filter(document=self):
            l.append((cell.pid(), cell.raw_text, cell.code))
        return l

class Cell(models.Model):
    document = models.ForeignKey(Document)
    raw_text = models.TextField()
    code = models.BooleanField()

    def pid(self):
        return self.id

    def doc_id(self):
        return self.document.uid()

    def cell(self):
        return (self.raw_text, self.code)

    def __str__(self):
        return str(self.doc_id()) + ' : ' + str(self.pid())