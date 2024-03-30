from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from ..serializers import HotelSerializer
from ..models import Hotel

class FlightAPIView(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = FlightSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request, pk):
        try:
            flight = Flight.objects.get(pk=pk)
        except Flight.DoesNotExist:
            return Response({'detail': 'Flight not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = FlightSerializer(flight, data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(serializer.data)

    def get(self, request, pk):
        try:
            flight = Flight.objects.get(pk=pk)
        except Flight.DoesNotExist:
            return Response({'detail': 'Flight not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = FlightSerializer(flight)
        return Response(serializer.data)

    def delete(self, request, pk):
        try:
            flight = Flight.objects.get(pk=pk)
        except Flight.DoesNotExist:
            return Response({'detail': 'Flight not found.'}, status=status.HTTP_404_NOT_FOUND)

        flight.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get(self, request):
        flights = Flight.objects.all()
        serializer = FlightSerializer(flights, many=True)
        return Response(serializer.data)
