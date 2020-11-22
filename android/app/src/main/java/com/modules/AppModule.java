package com.modules;

import android.content.Intent;
import android.net.Uri;

import androidx.annotation.NonNull;

import com.facebook.react.BuildConfig;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class AppModule extends ReactContextBaseJavaModule {

    public AppModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @NonNull
    @Override
    public String getName() {
        return "AppModule";
    }

    @ReactMethod
    public void phoneCall(final String phoneNumber) {
        final Intent intent = new Intent(Intent.ACTION_DIAL, Uri.fromParts("tel", phoneNumber, null));
        getCurrentActivity().startActivity(intent);
    }

    @ReactMethod
    public void shareLocation(final String url) {
        Intent sendIntent = new Intent();
        sendIntent.setAction(Intent.ACTION_SEND);
        sendIntent.putExtra(Intent.EXTRA_TEXT,
                "Share Location Info: " + url);
        sendIntent.setType("text/plain");
        getCurrentActivity().startActivity(Intent.createChooser(sendIntent, "choose one"));
    }
}
