from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import os
import numpy as np
import pickle
import imageio
from datetime import datetime
import glob
import json

"""This list contains a list of maximums and minimums for each of 10 axis.
This will help in making a scrollbar"""
l = [
    (20.983222076392256, -18.471851170137064),
    (15.153593963610554, -12.845062469998773),
    (8.059119758555537, -9.8122046550087),
    (8.746746883576675, -9.883974255716486),
    (8.95482920815898, -7.661649898609721),
    (5.177692705026761, -8.510149163911015),
    (5.69508566973028, -7.15607548826096),
    (6.130361010444568, -5.743907520964378),
    (6.361785592690525, -5.21314590103078),
    (5.145039971919608, -7.409652761146321),
]

path = os.path.join(os.path.curdir, "ngApp", "static", "ngApp", "numpyArrays")
imageSavePath = os.path.join(
    os.path.curdir, "ngApp", "static", "ngApp", "img", "celebs"
)
with open(os.path.join(path, "celebMapping.txt"), "rb") as fp:
    mapping = pickle.load(fp)

Y = np.load(os.path.join(path, "centeredData.npy"))
C = np.load(os.path.join(path, "components.npy"))
M = np.load(os.path.join(path, "mean.npy"))


def home(request, *args, **kwargs):
    return render(request, "ngApp/index.html", {})


def ngView(request, *args, **kwargs):
    """request.path returns a path of the form /ngApp/* and we remove / from the front"""
    path = request.path[1:]
    return render(request, path, {})


def getImages(request, *args, **kwargs):
    start = int(request.GET["start"]) - 1
    end = int(request.GET["end"])
    path = os.path.join(os.getcwd(), "ngApp", "static", "ngApp", "img", "celebs")
    images = os.listdir(path)
    data = {"total": len(images), "images": images[start:end]}
    return JsonResponse(data, safe=False)


# https://towardsdatascience.com/eigenfaces-recovering-humans-from-ghosts-17606c328184
def getEigenFace(request, *args, **kwargs):
    image = request.GET["image"]
    index = mapping[image]
    weights = np.dot(Y[index], C.T)
    centered_vector = np.dot(weights, C)
    arr = (M + centered_vector).reshape(64, 64)
    recovered_image = (
        ((arr - arr.min()) * (1 / (arr.max() - arr.min()) * 255))
        .astype("uint8")
        .reshape(64, 64)
    )
    return JsonResponse(
        {
            "list": l,
            "weights": weights.tolist()[:10],
            "image": recovered_image.tolist(),
        },
        safe=False,
    )


def updateEigenFace(request, *args, **kwargs):
    image = request.GET["img"]
    w = json.loads(request.GET["weights"])
    w = np.array(w)
    index = mapping[image]
    weights = np.dot(Y[index], C.T)
    weights[: w.shape[0]] = w
    centered_vector = np.dot(weights, C)
    arr = M + centered_vector
    # https://stackoverflow.com/questions/49922460/scale-a-numpy-array-with-from-0-1-0-2-to-0-255/49922520
    recovered_image = (
        ((arr - arr.min()) * (1 / (arr.max() - arr.min()) * 255))
        .astype("uint8")
        .reshape(64, 64)
    )
    return JsonResponse({"image": recovered_image.tolist()}, safe=False)

