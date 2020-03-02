FROM python:3.5

ADD ./webapp /webapp
WORKDIR /webapp

RUN pip install -r requirements.txt

EXPOSE 5000
CMD ["python","main.py"]