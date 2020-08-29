<template>
  <v-container class="pa-0">
    <v-snackbar v-model="errorAlert" bottom left>
      {{ errorMsg }}
      <v-btn color="pink" flat @click="errorAlert = false">Close</v-btn>
    </v-snackbar>

    <v-layout wrap align-center justify-center row fill-height class="mt-0 mb-0">
      <v-flex xs12 md12 lg12 class="pa-2 mb-0">
        <p class="google-font mb-0" style="font-size:170%;color:#0277bd">Upcoming Events</p>
        <p
          class="google-font mt-0 mb-0"
          style="font-size:120%"
        >Our events are open to newbies, developers, managers, and organizations who are interested in Google's technologies or use them as part of their projects.</p>
      </v-flex>
    </v-layout>

    <v-layout
      wrap
      align-start
      justify-start
      row
      fill-height
      class="hidden-sm-and-down my-3"
      :style="{'background-image':'url('+require('@/assets/img/svg/bg.svg')+')'}"
      style="background-position:right"
    >
      <v-flex xs12 sm6 md4 lg4 v-for="(item,i) in eventsData.upcomingEvent" :key="i">
        <v-card
          flat
          class="ma-1 pa-1 my-0 elevation-0"
          style="border-radius:7px;border:1px #ddd solid"
        >
          <v-card-title class="mb-0">
            <div>
              <p class="google-font mb-2" style="font-size:140%;color:#0277bd">{{ item.title }}</p>
              <p class="google-font mt-2 mb-1">
                <span
                  v-html="$options.filters.summery(item.description,180)"
                  style="font-size:110%"
                ></span>
              </p>
              <p class="google-font mt-1 mb-0" style="font-size:110%">
                <v-icon>insert_invitation</v-icon>
                {{item.date | dateFilter}}
              </p>
              <p class="google-font mt-1 mb-0" style="font-size:110%">
                <v-icon>watch_later</v-icon>
                {{item.time}}
              </p>
              <p class="google-font mt-1 mb-0" style="font-size:110%">
                <v-icon>map</v-icon>
                {{item.venue | summery(30)}}
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

      <v-flex xs12 v-if="notFoundUpcomingEventFlag==true">
        <p class="google-font px-2" style="font-size:140%">
          <v-icon>highlight_off</v-icon>Upcoming Events Not Found!
        </p>
      </v-flex>
    </v-layout>

    <!-- Mobile Screen -->
    <v-layout wrap align-center justify-center row fill-height class="hidden-md-and-up">
      <v-flex xs12>
        <v-slide-y-reverse-transition>
          <v-list two-line subheader class="grey lighten-5">
            <v-list-tile
              v-for="(item,i) in eventsData.upcomingEvent"
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
                >{{ item.date }} | {{ item.time }}</v-list-tile-sub-title>
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

      <v-flex xs12 v-if="notFoundUpcomingEventFlag==true">
        <p class="google-font px-2" style="font-size:140%">
          <v-icon>highlight_off</v-icon>Upcoming Events Not Found!
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
      notFoundUpcomingEventFlag: false,
      errorMsg: "",
      errorAlert: false
    };
  },
  filters: {
    summery: (val, num) => {
      return val.substring(0, num) + "...";
    },
    dateFilter: (value)=>{
        const date = new Date(value)
        return date.toLocaleString(['en-US'], {month: 'short', day: '2-digit', year: 'numeric'})
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
