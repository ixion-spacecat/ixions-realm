export default {
  layout: "layouts/immersive.njk",
  theme: "terminal",
  title: "Adventure",
  pagination: {
    data: "collections.rooms",
    size: 1,
    alias: "page",
    before,
    addAllPagesToCollections: false,
  },
  permalink: "adventure/{{ page.id }}.html",
  eleventyExcludeFromCollections: true,
};

function before(roomFiles) {
  const world = { url: "/adventure" };
  const rooms = roomFiles.map((file) => file.data.room);
  const pages = rooms.flatMap((room) =>
    room.states.map((state) => createPage(world, room, state)),
  );
  return pages;
}

function createPage(world, room, state) {
  const id = `${room.id}/${state.id}`;
  const title = room.name;
  const displayTitle = state.name
    ? `> ${state.name}`
    : state.id === "index" || state.showRoomName
      ? room.name
      : "";
  const roomName = room.name;
  const description = state.description;
  const choices = (state.choices ?? []).map((choice) =>
    createChoice(world, room, state, choice),
  );

  return {
    id,
    title,
    displayTitle,
    roomName,
    description,
    choices,
  };
}

function createChoice(world, room, state, choice) {
  const url = choice.goto
    ? `${world.url}/${choice.goto.replace("./", room.id + "/")}`
    : undefined;

  return {
    ...choice,
    url,
  };
}
