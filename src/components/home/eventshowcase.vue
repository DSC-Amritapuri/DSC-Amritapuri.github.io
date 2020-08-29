<template>
  <v-container class="pa-0">
    <v-snackbar v-model="errorAlert" bottom left>
      {{ errorMsg }}
      <v-btn color="pink" flat @click="errorAlert = false">Close</v-btn>
    </v-snackbar>

    <v-layout wrap align-center justify-center row fill-height class="my-3">
      <v-flex xs12 md9 lg9 class="pa-2 text-xs-center">
        <p class="google-font" style="font-size:170%">Our Events & Meetups</p>
        <p
          class="google-font"
          style="font-size:120%"
        >At sessions that span from the technical to the visionary, let’s celebrate and discover what the technologies can enable: how product innovation, open source, and ML and AI can propel enterprises forward and solve the big problems that impact all of us.</p>
        <router-link
          to="/events"
          flat
          color="#4C4A78"
          class="ma-0 google-font"
          style="border-radius:5px;text-transform: capitalize;text-decoration:none;color:#4C4A78"
        >See More</router-link>
      </v-flex>
    </v-layout>

    <v-layout wrap align-start justify-center row fill-height class="hidden-sm-and-down mb-4">
      <v-flex xs12 sm6 md3 lg3 v-for="(item,i) in showEvents" :key="i">
        <v-card
          flat
          class="ma-1 pa-1 my-0"
          style="border: 1px solid #e0e0e0;min-height:160px;border-radius:7px;"
        >
          <v-card-title class="mb-0">
            <div>
              <p class="google-font mb-0" style="font-size:130%">{{ item.title | summery(25) }}</p>
              <p class="google-font mt-1 mb-0" style="font-size:110%">
                <v-icon small>insert_invitation</v-icon>
                {{item.date | dateFilter}}
              </p>
              <p class="google-font mt-0 mb-0" style="font-size:110%">
                <v-icon small>watch_later</v-icon>
                {{item.time}}
              </p>
              <p class="google-font mt-0 mb-0" style="font-size:110%">
                <v-icon small>person</v-icon>
                by {{item.speaker}}
              </p>
              
            </div>
          </v-card-title>

          <v-card-actions class="mt-0">
            <v-spacer></v-spacer>
            <v-btn
              flat
              color="#4C4A78"
              :href="item.link"
              target="_blank"
              class="mb-0 ml-0 mt-0 google-font"
              style="border-radius:7px;text-transform: capitalize;"
            >See More</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12 v-if="notFoundEventFlag==true" class="text-xs-center">
        <p class="google-font px-2" style="font-size:140%">
          <v-icon>highlight_off</v-icon>Events Not Found!
        </p>
      </v-flex>
    </v-layout>

    <!-- Mobile Screen -->
    <v-layout wrap align-center justify-center row fill-height class="hidden-md-and-up mb-3">

      <v-flex xs12>
        <v-slide-y-reverse-transition>
          <v-list two-line subheader>
            <v-list-tile
              v-for="(item,i) in showEvents"
              :key="i"
              avatar
              style="border-color:#e0e0e0;border-width: 1px;border-style: solid;border-top:0; border-left:0; border-right:0; border-bottom:1"
            >
              <v-list-tile-avatar>
                <v-avatar color="grey lighten-2">
                  <span class="google-font" style="width:100vh">{{ item.icon }}</span>
                </v-avatar>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title class="google-font">{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title
                  class="google-font"
                >{{ item.date | dateFilter }} | {{ item.time }}</v-list-tile-sub-title>
                <v-list-tile-sub-title
                  class="google-font"
                >by {{ item.speaker }}</v-list-tile-sub-title>
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
      <v-flex xs12 v-if="notFoundEventFlag==true" class="text-xs-center">
        <p class="google-font px-2" style="font-size:140%">
          <v-icon>highlight_off</v-icon>Events Not Found!
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ChapterDetails from "@/assets/data/chaptersDetails.json";
import eventsJson from "@/assets/data/events.json";
export default {
  data() {
    return {
      chapterDetails: ChapterDetails,
      eventsData: eventsJson,
      events: eventsJson.events,
      errorMsg: "",
      errorAlert: false,
      notFoundEventFlag: false
    };
  },
  computed: {
    showEvents: function(){
      return this.events.filter(function(event){
        return event.showcase;
      })
    }
  },
  filters: {
    summery: (val, num) => {
      if(val.length > num){
        return val.substring(0,num)+".."
      }else{
        return val
      }
    },
    dateFilter: value => {
      const date = new Date(value);
      return date.toLocaleString(["en-US"], {
        month: "short",
        day: "2-digit",
        year: "numeric"
      });
    }
  }
};
</script>


<style>
.animate-shimmer {
  background: linear-gradient(286deg, #ffffff, #ddd);
  background-size: 400% 400%;
  -webkit-animation: AnimationName 5s ease infinite;
  -moz-animation: AnimationName 5s ease infinite;
  animation: AnimationName 5s ease infinite;
}
@-webkit-keyframes AnimationName {
  0% {
    background-position: 0% 52%;
  }
  50% {
    background-position: 100% 49%;
  }
  100% {
    background-position: 0% 52%;
  }
}
@-moz-keyframes AnimationName {
  0% {
    background-position: 0% 52%;
  }
  50% {
    background-position: 100% 49%;
  }
  100% {
    background-position: 0% 52%;
  }
}
@keyframes AnimationName {
  0% {
    background-position: 0% 52%;
  }
  50% {
    background-position: 100% 49%;
  }
  100% {
    background-position: 0% 52%;
  }
}
</style>