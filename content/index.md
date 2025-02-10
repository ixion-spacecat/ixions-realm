---
title: Home
layout: layouts/basic-2col.njk
hideTitle: true
---

<img src="/images/art/ixion-portrait-500.jpg" alt="Self-portrait of Ixion Space-Cat" width=250px class="float-right border-image">

# Welcome!

I'm **Ixion**, and this is my little corner of the internet!

I'm on a personal mission to rediscover the creative spark that burned inside me as a kid. Somewhere along the way, I forgot it existed. Now I'm ready to get it back!
<br>
<br>

---

## What's New?

{% set announcementlist = collections.announcements | last %}
{% include "components/announcement-list.njk" %}
[All Announcements...](/announcements/)

## Latest Blog Post

{% set postlist = collections.posts | last %}
{% include "components/post-list.njk" %}

[More Posts...](/blog/)

<br>

---

## What else is here?

- The portrait of my sona you see on this page (I drew it myself ^.^)
- An [art page](/art/) with some game designs from when I was a child
- A list of my [special interests](/interests/) (there's a lot of them 🤯)
- An unsatisfactory explanation of [why I am the way that I am](/about/)
- A [halloween mini-game](/events/2024/halloween/) I made last year with original pixel-art
<div class="inline-image-row">
  <img src="/images/share/ghost.gif" alt="">
  <img src="/images/share/pumpkin1.png" alt="">
  <img src="/images/share/zombie.gif" alt="">
  <img src="/images/share/skeleton.gif" alt="">
</div>

## What's to come?

- An RSS feed
- More art (and possibly music)
- More games
- Shrines
- More cool things TBD

---

I try to make this site accessible for desktop, mobile, and screen readers. I'm still new at this so if you see any ways I can improve accessibility please [contact](/contact/) me.

This site uses javascript for the theme switcher and a few widgets and games. I use {%link "https://ixions-realm.goatcounter.com/help/privacy" %}GoatCounter{%endlink%} to estimate site visits.
