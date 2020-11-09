package com.nearbysearch;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class LocationModule extends ReactContextBaseJavaModule {
    private static final String LATITUDE = "latitude";
    private static final String LONGITUDE = "longitude";
    private static final String PROVIDER = "provider";
    private static final String ACCURACY = "accuracy";
    private static final String ERROR = "error";
    private static final String ERROR_CODE = "errorCode";
    private static final String DATA = "data";
    private static final String RESPONSE = "response";

    public LocationModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "MyLocation";
    }

    @ReactMethod
    public void getLatLng(final Callback callback) {
        try {
            callback.invoke(prepareGpsResponse(), "");
        } catch (Exception e) {
            callback.invoke(prepareGpsResponse(), e.getMessage());
            e.printStackTrace();
        }
    }

    private WritableMap prepareGpsResponse() {
        final MyLocation myLocation = new MyLocation(getReactApplicationContext());
        final WritableMap location = new WritableNativeMap();
        try {
            location.putDouble(LATITUDE, myLocation.getLatitude());
            location.putDouble(LONGITUDE, myLocation.getLongitude());
            location.putString(PROVIDER, myLocation.getProvider());
            location.putDouble(ACCURACY, myLocation.getAccuracy());
            if (myLocation.getError() != null && !myLocation.getError().isEmpty()) {
                location.putString(ERROR, myLocation.getError());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return location;
    }

    private static JSONObject convertMapToJson(final ReadableMap readableMap) throws JSONException {
        final JSONObject object = new JSONObject();
        final ReadableMapKeySetIterator iterator = readableMap.keySetIterator();
        while (iterator.hasNextKey()) {
            final String key = iterator.nextKey();
            switch (readableMap.getType(key)) {
                case Null:
                    object.put(key, JSONObject.NULL);
                    break;
                case Boolean:
                    object.put(key, readableMap.getBoolean(key));
                    break;
                case Number:
                    object.put(key, readableMap.getDouble(key));
                    break;
                case String:
                    object.put(key, readableMap.getString(key));
                    break;
                case Map:
                    object.put(key, convertMapToJson(readableMap.getMap(key)));
                    break;
                case Array:
                    object.put(key, convertArrayToJson(readableMap.getArray(key)));
                    break;
            }
        }
        return object;
    }

    private static JSONArray convertArrayToJson(final ReadableArray readableArray) throws JSONException {
        final JSONArray array = new JSONArray();
        for (int i = 0; i < readableArray.size(); i++) {
            switch (readableArray.getType(i)) {
                case Null:
                    break;
                case Boolean:
                    array.put(readableArray.getBoolean(i));
                    break;
                case Number:
                    array.put(readableArray.getDouble(i));
                    break;
                case String:
                    array.put(readableArray.getString(i));
                    break;
                case Map:
                    array.put(convertMapToJson(readableArray.getMap(i)));
                    break;
                case Array:
                    array.put(convertArrayToJson(readableArray.getArray(i)));
                    break;
            }
        }
        return array;
    }
}