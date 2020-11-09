package com.nearbysearch;

import android.content.Context;
import android.content.pm.PackageManager;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.util.Log;

import androidx.core.content.ContextCompat;

import java.text.DecimalFormat;

public class MyLocation implements LocationListener {
    private static final String TAG = "MyLocation";
    private LocationManager locationManager;
    private android.location.Location mLocation;
    private double latitude;

    public float getAccuracy() {
        return accuracy;
    }

    public void setAccuracy(float accuracy) {
        this.accuracy = accuracy;
    }

    private float accuracy = 0f;

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    private String provider = "";

    public String getError() {
        return error;
    }

    private String error = "";

    public double getLatitude() {
        try {
            latitude = Double.parseDouble(new DecimalFormat("#.000000").format(latitude));
        } catch (NumberFormatException e) {
            return 0;
        }
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        try {
            longitude = Double.parseDouble(new DecimalFormat("#.000000").format(longitude));
        } catch (NumberFormatException e) {
            return 0;
        }
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    private double longitude;

    public MyLocation(Context context) {
        locationManager = (LocationManager) context.getSystemService(Context.LOCATION_SERVICE);
        if (locationManager != null) {
            if (ContextCompat.checkSelfPermission(context, android.Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED &&
                    ContextCompat.checkSelfPermission(context, android.Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED) {

                final boolean isGps = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER);
               // Log.i(TAG, "GPS_PROVIDER provider status " + isGps);

                final boolean isNet = locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER);
               // Log.i(TAG, "NETWORK_PROVIDER provider status " + isNet);

                final boolean isPassive = locationManager.isProviderEnabled(LocationManager.PASSIVE_PROVIDER);
               // Log.i(TAG, "PASSIVE_PROVIDER provider status " + isPassive);

                //Log.i(TAG, "all providers " + locationManager.getAllProviders());

                //Log.i(TAG, "enabled providers " + locationManager.getProviders(true));

                if (!isGps && !isNet) {
                   // Log.i(TAG, "no provider !");
                    error = "no providers available to get location";
                }
                if (isGps) {
                    //Log.i(TAG, "GPS_PROVIDER provider");
                    mLocation = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
                    setProvider(LocationManager.GPS_PROVIDER);
                    locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 0, 0, this);
                }
                if (isNet) {
                    //Log.i(TAG, "NETWORK_PROVIDER provider");
                    mLocation = locationManager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
                    setProvider(LocationManager.NETWORK_PROVIDER);
                    locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 0, 0, this);
                }
                if (false) {
                   // Log.i(TAG, "PASSIVE_PROVIDER provider");
                    mLocation = locationManager.getLastKnownLocation(LocationManager.PASSIVE_PROVIDER);
                    setProvider(LocationManager.PASSIVE_PROVIDER);
                    locationManager.requestLocationUpdates(LocationManager.PASSIVE_PROVIDER, 0, 0, this);
                }
                if (mLocation != null) {
                    setLongitude(mLocation.getLongitude());
                    setLatitude(mLocation.getLatitude());
                    setProvider(mLocation.getProvider());
                    setAccuracy(mLocation.getAccuracy());
                }
            }
        } else {
            error = "MyLocation Manager is null";
        }
    }


    public boolean checkGpsEnabled() {
        return locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER);
    }

    @Override
    public void onLocationChanged(android.location.Location location) {
        setLatitude(location.getLatitude());
        setLongitude(location.getLongitude());
        setProvider(location.getProvider());
        setAccuracy(location.getAccuracy());

    }

    @Override
    public void onStatusChanged(String provider, int i, Bundle bundle) {
        Log.i(TAG, "onStatusChanged::provider::" + provider + " i= " + i);
    }

    @Override
    public void onProviderEnabled(String provider) {
        Log.i(TAG, "onProviderEnabled::provider::" + provider);
    }

    @Override
    public void onProviderDisabled(String provider) {
        Log.i(TAG, "onProviderDisabled::provider::" + provider);
    }
}
