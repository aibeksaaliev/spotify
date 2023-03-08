import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";
import User from "./models/User";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('artists');
    await db.dropCollection('albums');
    await db.dropCollection('tracks');
    await db.dropCollection('trackhistories');
  } catch (e) {
    console.log("Collections were not present, skipping drop...");
  }

  await User.create({
    username: "user",
    password: "user",
    token: "user_token",
    role: "user"
  }, {
    username: "admin",
    password: "admin",
    token: "admin_token",
    role: "admin"
  });

  const [artist1, artist2, artist3] = await Artist.create({
    name: "U2",
    photo: "photos/U2.jpg",
    info: "U2 are an Irish rock band from Dublin, formed in 1976. The group consists of Bono (lead vocals and rhythm guitar), the Edge (lead guitar, keyboards, and backing vocals), Adam Clayton (bass guitar), and Larry Mullen Jr. (drums and percussion). Initially rooted in post-punk, U2's musical style has evolved throughout their career, yet has maintained an anthemic quality built on Bono's expressive vocals and the Edge's chiming, effects-based guitar sounds. Bono's lyrics, often embellished with spiritual imagery, focus on personal and sociopolitical themes. Popular for their live performances, the group have staged several ambitious and elaborate tours over their career.",
    isPublished: true
  }, {
    name: "Linkin Park",
    photo: "photos/LP.jpg",
    info: "Linkin Park is an American rock band from Agoura Hills, California. The band's current lineup comprises vocalist/rhythm guitarist/keyboardist Mike Shinoda, lead guitarist Brad Delson, bassist Dave Farrell, DJ/turntablist Joe Hahn and drummer Rob Bourdon, all of whom are founding members. Vocalists Mark Wakefield and Chester Bennington are former members of the band. Categorized as alternative rock, Linkin Park's earlier music spanned a fusion of heavy metal and hip hop, while their later music features more electronica and pop elements.",
    isPublished: true
  }, {
    name: "Red Hot Chili Peppers",
    photo: "photos/RHCP.jpeg",
    info: "Red Hot Chili Peppers are an American rock band formed in Los Angeles in 1982,[1] comprising vocalist Anthony Kiedis, bassist Flea, drummer Chad Smith, and guitarist John Frusciante. Their music incorporates elements of alternative rock, funk, punk rock, hard rock, hip hop, and psychedelic rock. Their eclectic range has influenced genres such as funk metal,[2] rap metal,[3] rap rock,[4] and nu metal.[5][3] With over 120 million records sold worldwide, Red Hot Chili Peppers are one of the best-selling bands of all time.[6] They hold the records for most number-one singles (15), most cumulative weeks at number one (91) and most top-ten songs (28) on the Billboard Alternative Songs chart.[7] They have won six Grammy Awards, were inducted into the Rock and Roll Hall of Fame in 2012, and in 2022 received a star on the Hollywood Walk of Fame.",
    isPublished: true
  });

  const [album1, album2, album3, album4, album5] = await Album.create({
    title: "Zooropa",
    artist: artist1._id,
    releaseYear: 1993,
    cover: "covers/zooropa.jpg",
    isPublished: true
  }, {
    title: "The Joshua Tree",
    artist: artist1._id,
    releaseYear: 1987,
    cover: "covers/the_joshua_tree.png",
    isPublished: true
  }, {
    title: "Meteora",
    artist: artist2._id,
    releaseYear: 2003,
    cover: "covers/meteora.jpg",
    isPublished: true
  }, {
    title: "Minutes to Midnight",
    artist: artist2._id,
    releaseYear: 2007,
    cover: "covers/minutes_to_midnight.jpg",
    isPublished: true
  }, {
    title: "2011 Live EP",
    artist: artist3._id,
    releaseYear: 2012,
    cover: "covers/2011_live_ep.jpeg",
    isPublished: false
  });

  await Track.create({
    title: "Zooropa",
    album: album1._id,
    duration: "6:31",
    number: 1,
    videoId: "H9Sbk_Hozbs",
    isPublished: true
  }, {
    title: "Babyface",
    album: album1._id,
    duration: "4:01",
    number: 2,
    videoId: "B8_pgxLU5Q8",
    isPublished: true
  }, {
    title: "Numb",
    album: album1._id,
    duration: "4:20",
    number: 3,
    videoId: "N4jR1RNypG0",
    isPublished: true
  }, {
    title: "Lemon",
    album: album1._id,
    duration: "6:58",
    number: 4,
    videoId: "KEcx9F_FW2U",
    isPublished: true
  }, {
    title: "Stay",
    album: album1._id,
    duration: "4:58",
    number: 5,
    videoId: "UGAOstUIhpU",
    isPublished: true
  }, {
    title: "Daddy's Gonna Pay for Your Crashed Car",
    album: album1._id,
    duration: "5:20",
    number: 6,
    videoId: "W_g8l0TDZkE",
    isPublished: true
  }, {
    title: "Some Days Are Better Than Others",
    album: album1._id,
    duration: "4:17",
    number: 7,
    videoId: "mQj0hzwCjpI",
    isPublished: true
  }, {
    title: "The First Time",
    album: album1._id,
    duration: "3:45",
    number: 8,
    videoId: "AhVYk9X-skw",
    isPublished: true
  }, {
    title: "Dirty Day",
    album: album1._id,
    duration: "5:24",
    number: 9,
    videoId: "",
    isPublished: true
  }, {
    title: "The Wanderer",
    album: album1._id,
    duration: "5:41",
    number: 10,
    videoId: "JwBSFpF568k",
    isPublished: true
  }, {
    title: "Where the Streets Have No Name",
    album: album2._id,
    duration: "5:38",
    number: 1,
    videoId: "GzZWSrr5wFI",
    isPublished: true
  }, {
    title: "I Still Haven't Found What I'm Looking For",
    album: album2._id,
    duration: "4:38",
    number: 2,
    videoId: "e3-5YC_oHjE",
    isPublished: true
  }, {
    title: "With or Without You",
    album: album2._id,
    duration: "4:56",
    number: 3,
    videoId: "ujNeHIo7oTE",
    isPublished: true
  }, {
    title: "Bullet the Blue Sky",
    album: album2._id,
    duration: "4:32",
    number: 4,
    videoId: "Wj3_m6VxW-U",
    isPublished: true
  }, {
    title: "Running to Stand Still",
    album: album2._id,
    duration: "4:18",
    number: 5,
    videoId: "FvUI-s4Azw4",
    isPublished: true
  }, {
    title: "Foreward",
    album: album3._id,
    duration: "0:13",
    number: 1,
    videoId: "YQDSFJXRIIE",
    isPublished: true
  }, {
    title: "Don't say",
    album: album3._id,
    duration: "3:07",
    number: 2,
    videoId: "oWfGOVWrueo",
    isPublished: true
  }, {
    title: "Somewhere I Belong",
    album: album3._id,
    duration: "3:33",
    number: 3,
    videoId: "zsCD5XCu6CM",
    isPublished: true
  }, {
    title: "Lying from You",
    album: album3._id,
    duration: "2:55",
    number: 4,
    videoId: "NjdgcHdzvac",
    isPublished: true
  }, {
    title: "Hit the Floor",
    album: album3._id,
    duration: "2:44",
    number: 5,
    videoId: "oMals9XXQY8",
    isPublished: true
  }, {
    title: "Easier to Run",
    album: album3._id,
    duration: "3:24",
    number: 6,
    videoId: "U5zdmjVeQzE",
    isPublished: true
  }, {
    title: "Faint",
    album: album3._id,
    duration: "2:42",
    number: 7,
    videoId: "LYU-8IFcDPw",
    isPublished: true
  }, {
    title: "Figure.09",
    album: album3._id,
    duration: "3:17",
    number: 8,
    videoId: "LpC0SKU6O00",
    isPublished: true
  }, {
    title: "Breaking the Habit",
    album: album3._id,
    duration: "3:16",
    number: 9,
    videoId: "Np_1j1nwyiY",
    isPublished: true
  }, {
    title: "From the Inside",
    album: album3._id,
    duration: "2:53",
    number: 10,
    videoId: "YLHpvjrFpe0",
    isPublished: true
  }, {
    title: "Nobody's Listening",
    album: album3._id,
    duration: "2:58",
    number: 11,
    videoId: "QJ87793QXes",
    isPublished: true
  }, {
    title: "Session",
    album: album3._id,
    duration: "2:23",
    number: 12,
    videoId: "J1KqQYsUYIk",
    isPublished: true
  }, {
    title: "Numb",
    album: album3._id,
    duration: "3:07",
    number: 13,
    videoId: "kXYiU_JCYtU",
    isPublished: true
  }, {
    title: "Wake (Instrumental)",
    album: album4._id,
    duration: "1:40",
    number: 1,
    videoId: "kKUrBJ5JWGM",
    isPublished: true
  }, {
    title: "Given Up",
    album: album4._id,
    duration: "3:09",
    number: 2,
    videoId: "0xyxtzD54rM",
    isPublished: true
  }, {
    title: "Leave Out All the Rest",
    album: album4._id,
    duration: "3:29",
    number: 3,
    videoId: "yZIummTz9mM",
    isPublished: true
  }, {
    title: "Bleed it Out",
    album: album4._id,
    duration: "2:44",
    number: 4,
    videoId: "OnuuYcqhzCE",
    isPublished: true
  }, {
    title: "Shadow of the Day",
    album: album4._id,
    duration: "4:49",
    number: 5,
    videoId: "n1PCW0C1aiM",
    isPublished: true
  }, {
    title: "What I've Done",
    album: album4._id,
    duration: "3:25",
    number: 6,
    videoId: "8sgycukafqQ",
    isPublished: true
  }, {
    title: "Hands Held High",
    album: album4._id,
    duration: "3:53",
    number: 7,
    videoId: "gG4P3ayBzVY",
    isPublished: true
  }, {
    title: "No More Sorrow",
    album: album4._id,
    duration: "3:41",
    number: 8,
    videoId: "rW4uBvP2Dqc",
    isPublished: true
  }, {
    title: "Valentine's Day",
    album: album4._id,
    duration: "3:16",
    number: 9,
    videoId: "KAFOpywZbMM",
    isPublished: true
  }, {
    title: "In Between",
    album: album4._id,
    duration: "3:16",
    number: 10,
    videoId: "YgVzhgygYfs",
    isPublished: true
  }, {
    title: "In Pieces",
    album: album4._id,
    duration: "3:38",
    number: 11,
    videoId: "NaRBn6QIMcQ",
    isPublished: true
  }, {
    title: "The Little Things Give You Away",
    album: album4._id,
    duration: "6:23",
    number: 12,
    videoId: "Gs0t8LXH6lw",
    isPublished: true
  }, {
    title: "Look around",
    album: album5._id,
    duration: "3:48",
    number: 1,
    videoId: "O8vBrF59xjY",
    isPublished: false
  }, {
    title: "Dani California",
    album: album5._id,
    duration: "5:10",
    number: 2,
    videoId: "E_E_tmRRh3Q",
    isPublished: false
  }, {
    title: "Monarchy of Roses",
    album: album5._id,
    duration: "3:28",
    number: 3,
    videoId: "I1xU254xfqA",
    isPublished: false
  }, {
    title: "If You Have to Ask",
    album: album5._id,
    duration: "5:24",
    number: 4,
    videoId: "VFh6ua8kBMo",
    isPublished: false
  }, {
    title: "Give It Away",
    album: album5._id,
    duration: "10:02",
    number: 5,
    videoId: "zifakcjIaBs",
    isPublished: false
  });

  await db.close();
};

void run();