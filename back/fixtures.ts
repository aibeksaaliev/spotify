import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('artists');
    await db.dropCollection('albums');
    await db.dropCollection('tracks');
  } catch (e) {
    console.log("Collections were not present, skipping drop...");
  }

  const [artist1, artist2] = await Artist.create({
    name: "U2",
    photo: "photos/U2.jpg",
    info: "U2 are an Irish rock band from Dublin, formed in 1976. The group consists of Bono (lead vocals and rhythm guitar), the Edge (lead guitar, keyboards, and backing vocals), Adam Clayton (bass guitar), and Larry Mullen Jr. (drums and percussion). Initially rooted in post-punk, U2's musical style has evolved throughout their career, yet has maintained an anthemic quality built on Bono's expressive vocals and the Edge's chiming, effects-based guitar sounds. Bono's lyrics, often embellished with spiritual imagery, focus on personal and sociopolitical themes. Popular for their live performances, the group have staged several ambitious and elaborate tours over their career."
  }, {
    name: "Linkin Park",
    photo: "photos/LP.jpg",
    info: "Linkin Park is an American rock band from Agoura Hills, California. The band's current lineup comprises vocalist/rhythm guitarist/keyboardist Mike Shinoda, lead guitarist Brad Delson, bassist Dave Farrell, DJ/turntablist Joe Hahn and drummer Rob Bourdon, all of whom are founding members. Vocalists Mark Wakefield and Chester Bennington are former members of the band. Categorized as alternative rock, Linkin Park's earlier music spanned a fusion of heavy metal and hip hop, while their later music features more electronica and pop elements."
  });

  const [album1, album2, album3, album4] = await Album.create({
    title: "Zooropa",
    artist: artist1._id,
    releaseYear: 1993,
    cover: "covers/zooropa.jpg"
  }, {
    name: "The Joshua Tree",
    artist: artist1._id,
    releaseYear: 1987,
    cover: "covers/the_joshua_tree.png",
  }, {
    name: "Meteora",
    artist: artist2._id,
    releaseYear: 2003,
    cover: "covers/meteora.jpg"
  }, {
    name: "Minutes to Midnight",
    artist: artist2._id,
    releaseYear: 2007,
    cover: "covers/minutes_to_midnight.jpg"
  });

  await Track.create({
    title: "Zooropa",
    album: album1._id,
    duration: "6:31",
    number: 1
  }, {
    title: "Babyface",
    album: album1._id,
    duration: "4:01",
    number: 2
  }, {
    title: "Numb",
    album: album1._id,
    duration: "4:20",
    number: 3
  }, {
    title: "Lemon",
    album: album1._id,
    duration: "6:58",
    number: 4
  }, {
    title: "Stay",
    album: album1._id,
    duration: "4:58",
    number: 5
  }, {
    title: "Daddy's Gonna Pay for Your Crashed Car",
    album: album1._id,
    duration: "5:20",
    number: 6
  }, {
    title: "Some Days Are Better Than Others",
    album: album1._id,
    duration: "4:17",
    number: 7
  }, {
    title: "The First Time",
    album: album1._id,
    duration: "3:45",
    number: 8
  }, {
    title: "Dirty Day",
    album: album1._id,
    duration: "5:24",
    number: 9
  }, {
    title: "The Wanderer",
    album: album1._id,
    duration: "5:41",
    number: 10
  }, {
    title: "Where the Streets Have No Name",
    album: album2._id,
    duration: "5:38",
    number: 1
  }, {
    title: "I Still Haven't Found What I'm Looking For",
    album: album2._id,
    duration: "4:38",
    number: 2
  }, {
    title: "With or Without You",
    album: album2._id,
    duration: "4:56",
    number: 3
  }, {
    title: "Bullet the Blue Sky",
    album: album2._id,
    duration: "4:32",
    number: 4
  }, {
    title: "Running to Stand Still",
    album: album2._id,
    duration: "4:18",
    number: 5
  }, {
    title: "Foreward",
    album: album3._id,
    duration: "0:13",
    number: 1
  }, {
    title: "Don't say",
    album: album3._id,
    duration: "3:07",
    number: 2
  }, {
    title: "Somewhere I Belong",
    album: album3._id,
    duration: "3:33",
    number: 3
  }, {
    title: "Lying from You",
    album: album3._id,
    duration: "2:55",
    number: 4
  }, {
    title: "Hit the Floor",
    album: album3._id,
    duration: "2:44",
    number: 5
  }, {
    title: "Easier to Run",
    album: album3._id,
    duration: "3:24",
    number: 6
  }, {
    title: "Faint",
    album: album3._id,
    duration: "2:42",
    number: 7
  }, {
    title: "Figure.09",
    album: album3._id,
    duration: "3:17",
    number: 8
  }, {
    title: "Breaking the Habit",
    album: album3._id,
    duration: "3:16",
    number: 9
  }, {
    title: "From the Inside",
    album: album3._id,
    duration: "2:53",
    number: 10
  }, {
    title: "Nobody's Listening",
    album: album3._id,
    duration: "2:58",
    number: 11
  }, {
    title: "Session",
    album: album3._id,
    duration: "2:23",
    number: 12
  }, {
    title: "Numb",
    album: album3._id,
    duration: "3:07",
    number: 13
  }, {
    title: "Wake (Instrumental)",
    album: album4._id,
    duration: "1:40",
    number: 1
  }, {
    title: "Given Up",
    album: album4._id,
    duration: "3:09",
    number: 2
  }, {
    title: "Leave Out All the Rest",
    album: album4._id,
    duration: "3:29",
    number: 3
  }, {
    title: "Bleed it Out",
    album: album4._id,
    duration: "2:44",
    number: 4
  }, {
    title: "Shadow of the Day",
    album: album4._id,
    duration: "4:49",
    number: 5
  }, {
    title: "What I've Done",
    album: album4._id,
    duration: "3:25",
    number: 6
  }, {
    title: "Hands Held High",
    album: album4._id,
    duration: "3:53",
    number: 7
  }, {
    title: "No More Sorrow",
    album: album4._id,
    duration: "3:41",
    number: 8
  }, {
    title: "Valentine's Day",
    album: album4._id,
    duration: "3:16",
    number: 9
  }, {
    title: "In Between",
    album: album4._id,
    duration: "3:16",
    number: 10
  }, {
    title: "In Pieces",
    album: album4._id,
    duration: "3:38",
    number: 11
  }, {
    title: "The Little Things Give You Away",
    album: album4._id,
    duration: "6:23",
    number: 12
  });

  await db.close();
};

void run();