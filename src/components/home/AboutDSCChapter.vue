<template>
    <v-container class="pa-0 white--text">
        <v-layout wrap align-center justify-center row fill-height class="my-3" >
           <v-flex xs12 md12 lg12 class="pa-2">
               <p class="google-font" style="font-size:150%">About {{details.name}}</p>
               <p class="google-font" style="font-size:110%">
                   {{details.description}}
               </p>
               <v-btn :href="details.github" target="_blank" outline color="white" class="ma-0 google-font" style="border-radius:5px;text-transform: capitalize;">Github Page</v-btn>
               &nbsp;
               <v-btn :href="details.linkedin" target="_blank" outline color="white" class="ma-0 google-font" style="border-radius:5px;text-transform: capitalize;">LinkedIn Page</v-btn>
               &nbsp;
               <v-btn :href="details.twitter" target="_blank" outline color="white" class="ma-0 google-font" style="border-radius:5px;text-transform: capitalize;">Twitter Page</v-btn>
                <br><br>
               <router-link to="/about" class="google-font" style="text-decoration:none;color:white">See More about {{details.name}}</router-link>
            </v-flex> 
           
        </v-layout>

    </v-container>
</template>

<script>
import { db } from '../firebase'
export default {
    data() {
        return {
            details: ''
        }
    },
    firestore(){
        return {
            details: db.collection('details').doc("details")
        }
    }
}
</script>
