import Vue from 'vue'
import {firestorePlugin} from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
Vue.use(firestorePlugin)
firebase.initializeApp({
    databaseURL: "https://dscau-android-client.firebaseio.com",
    projectId: "dscau-android-client",
})
export const db = firebase.firestore()