<template>
  <div class="home">
    <div class="background">
      <BackgroundHomeHeader/>
      <div class="top-content">
        <h1 class="title">iimpact</h1>
        <p class="description">Club école de l'IIM</p>
      </div>
      <div class="scrollDown">
        <div class="mouse">
          <span></span>
        </div>
        <p>scroll down</p>
      </div>
    </div>
    <div class="content">
      <div class="missions">
        <Missions
          v-for="mission in missions"
          :key="'mission-' + mission.id"
          :alt="mission.alt"
          :title="mission.title"
          :image="envApiUrl + mission.icon.url"
        />
      </div>
      <div class="presentation" :key="'presentation-' + presentations.id">
        <div class="top">
          <div class="videoText">
            <img :src="envApiUrl + presentations.media.url" class="video" v-if="presentations.id !== undefined">
            <div class="title">{{ presentations.titlePresentation }}</div>
            <div class="text">{{ presentations.firstContentPresentation }}
            </div>
          </div>
        </div>
        <p class="bottomText">{{ presentations.secondContentPresentation }}</p>
      </div>
      <div class="pres-button">
        <Button
          :name="button1"
          :link="link"
          :isYellow="isYellow"
          v-bind:class="{
              yellow: isYellow
            }"
        />
      </div>
      <BackgroundHomeBottom/>
      <div class="actu-events">
        <div class="actu">
          <p class="title">Notre actualité</p>
          <div class="video">
            <div class="text">
              <p class="title">Semaine d’intégration</p>
              <p class="description">IIMPACT, le Club Ecole de l’IIM, prend le contrôle de la semaine d’intégration. Du
                9 au 13 septembre se tenait la Welcome Week, la semaine d’intégration...</p>
            </div>
          </div>
        </div>
        <div class="events">
          <p class="title">Nos derniers évènements</p>
          <Event v-for="event in events" :key="'event-' + event.id"
                 :title="event.title"
                 :src="event.src"
                 :date="event.date"
          />
          <Button
            :name="button2"
            :link="link"
            :isBlack="isBlack"
            v-bind:class="{
              black: isBlack
        }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import BackgroundHomeHeader from "@/components/backgroundHomeHeader.vue";
import BackgroundHomeBottom from "@/components/backgroundHomeBottom.vue";
import Missions from "@/components/missions.vue";
import Event from "@/components/event.vue";
import Button from "@/components/Button.vue";
import GetDataFetchedFromApi from "../logic/httpClient/getDataFetchFromApi";


export default {
  async fetch() {
    this.presentations = await fetch(`${process.env.baseUrl}/home`).then(res => res.json());
    this.missions = await fetch(`${process.env.baseUrl}/missions`).then(res => res.json());
  },
  name: 'Home',
  components: {
    BackgroundHomeHeader,
    BackgroundHomeBottom,
    Missions,
    Event,
    Button
  },
  data() {
    return {
      envApiUrl: process.env.baseUrl,
      button1: "Voir notre magazine",
      button2: "Voir tous nos évènements",
      link: "#",
      isYellow: true,
      isBlack: true,
      events: [
        {
          id: "1",
          title: "Lorem Ispum",
          date: "05/09/2021",
          src: "https://placehold.jp/227x143.png"
        },
        {
          id: "2",
          title: "Lorem Ispum",
          date: "05/09/2021",
          src: "https://placehold.jp/227x143.png"
        },
        {
          id: "3",
          title: "Lorem Ispum",
          date: "05/09/2021",
          src: "https://placehold.jp/227x143.png"
        }
      ],
      missions: [],
      presentations: []
    }
  },
  head() {
    return {
      title: "IIMPACT - Accueil",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Accueil description",
        }
      ]
    }
  },
}
</script>
