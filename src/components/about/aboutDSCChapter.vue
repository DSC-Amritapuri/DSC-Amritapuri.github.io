<template>
    <v-container class="pa-0 my-0">
        <v-layout wrap align-start justify-start row fill-height class="my-0" >
            <v-flex xs12 sm5 md4 lg4 class="pa-2">
                <v-img
                    :src="require('@/assets/img/gdg.png')"
                    :lazy-src="require('@/assets/img/gdg.png')"
                    class=""
                    width="100%">
                    <v-layout
                        slot="placeholder"
                        fill-height
                        align-center
                        justify-center
                        ma-0
                    >
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-layout>
                </v-img>
            </v-flex>
            <v-flex xs12 sm7 md8 lg8 class="pa-2 my-0">
                <p class="google-font" style="font-size:120%;">{{details.description}}</p>

                <p class="google-font grey--text mt-3" style="font-size:120%">{{details.about}}</p>

                <v-btn v-if="details.becomeMemberURL.length>0" :href="details.becomeMemberURL" target="_blank" class="ma-0 google-font elevation-1" color="#1a73e8" style="text-transform: capitalize;border-radius:5px;color:white">Become a Member</v-btn> 
                &nbsp;

                <v-btn :href="details.aboutDSCLink" target="_blank" outline color="cyan" style="text-transform: capitalize;border-radius:5px"  class="ml-0" dark>Learn More</v-btn>
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
