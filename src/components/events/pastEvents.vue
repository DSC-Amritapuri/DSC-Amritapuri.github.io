<template>
    <v-container class="pa-0 mb-3">
        <v-snackbar
            v-model="errorAlert"
            bottom
            left
            >
            {{ errorMsg }}
            <v-btn
                color="pink"
                flat
                @click="errorAlert = false"
            >
                Close
            </v-btn>
        </v-snackbar>

        <v-layout wrap align-center justify-center row fill-height class="mt-0 mb-0" >
           <v-flex xs12 md12 lg12 class="pa-2 mb-0">
               <p class="google-font mb-0" style="font-size:170%;color:#0277bd">Directory of past events</p>
               <p class="google-font mt-0 mb-0" style="font-size:110%;color:#616161 ">
                   Events are listed in reverse chronological order by date.
               </p>     

            </v-flex> 
        </v-layout>

        <v-layout wrap row >
            <v-flex xs12 sm6 md4 lg4 v-for="(item,i) in events" :key="i">
                <v-slide-y-reverse-transition>
                    <v-list two-line subheader class="pa-2">
                        <v-list-tile
                            avatar
                            style="border-color:#e0e0e0;border-width: 1px;border-style: solid;border-top:0; border-left:0; border-right:0; border-bottom:1"
                        >
                            <v-list-tile-avatar>
                                <v-avatar color="grey lighten-2" >
                                    <span class="google-font" style="width:100vh">{{ item.icon }}</span>
                                </v-avatar>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                <v-list-tile-title class="google-font" style="color:#424242">{{ item.title }}</v-list-tile-title>
                                <v-list-tile-sub-title class="google-font">{{ item.date | dateFilter}} | {{ item.time }}</v-list-tile-sub-title>
                                <v-list-tile-sub-title class="google-font">by {{ item.speaker }}</v-list-tile-sub-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                                <v-tooltip bottom>
                                    <v-btn icon ripple :href="item.link" target="_blank" slot="activator">
                                        <v-icon color="grey darken-1">info</v-icon>
                                    </v-btn>
                                    
                                    <span>See More about {{item.title}}</span>
                                </v-tooltip>
                            </v-list-tile-action>
                            
                        </v-list-tile>
                        

                    </v-list>
                </v-slide-y-reverse-transition>
            </v-flex>

            <v-flex xs12 v-if="notFoundPastEventFlag==true">
                <p class="google-font px-2" style="font-size:140%"><v-icon >highlight_off</v-icon> Past Events Not Found!</p>
            </v-flex>

            
        </v-layout>

    </v-container>
</template>

<script>
import { db } from '../firebase';
export default {
    data() {
        return {
            events: [],
            errorMsg:'',
            errorAlert:false,
            notFoundPastEventFlag:false,
            currDate: this.filterDate()
        }
    },
    firestore(){
        return {
           events: db.collection('events').orderBy('date', 'desc').where('date', '<', this.currDate)
        }
    },
    methods: {
        filterDate(){
            var currDate = new Date()
            var tempMonth = currDate.getMonth() < 9 ? "0" + (currDate.getMonth() + 1) : currDate.getMonth() + 1
            var tempYear = currDate.getFullYear()
            var tempDate = currDate.getDate() < 9 ? "0" + currDate.getDate() : currDate.getDate()
            var newDate = "" + tempYear + "-" + tempMonth + "-" + tempDate
            return newDate
        }
    },
    filters:{
        summery: (val,num)=>{
            return val.substring(0,num)+".."
        },
        dateFilter: (value)=>{
            const date = new Date(value)
            return date.toLocaleString(['en-US'], {month: 'short', day: '2-digit', year: 'numeric'})
        }
    }
}
</script>

<style scoped>
    
</style>

