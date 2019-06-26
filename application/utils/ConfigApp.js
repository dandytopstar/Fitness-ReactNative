
//////////////////// CONFIG APP

import Expo from 'expo';

const isStandAloneApp = Expo.Constants.appOwnership == "standalone";

const ConfigApp = {

    // backend url
    URL: "YOUR_BACKEND_URL",

    // banner admob unit id
    BANNER_ID: "YOUR_BANNER_ID",

    // interstitial admob unit id
    INTERSTITIAL_ID: "YOUR_INTERSTITIAL_ID",

    // testdevice id, DON'T CHANGE IT
    TESTDEVICE_ID : isStandAloneApp?"EMULATOR" : "EMULATOR"
};

export default ConfigApp;
