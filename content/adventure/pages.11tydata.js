export default {
  layout: "layouts/immersive.njk",
  theme: "terminal",
  title: "Adventure",
  pagination: {
    data: "adventure.rooms",
    size: 1,
    alias: "page",
    before: function (rooms) {
      const base = "/adventure";
      return rooms
        .map((room) =>
          room.states.map((state) => ({
            id: `${room.id}/${state.id}`,
            title: room.name,
            displayTitle: state.name
              ? `> ${state.name}`
              : state.id === "index" || state.showRoomName
                ? room.name
                : "",
            roomName: room.name,
            description: state.description,
            choices: (state.choices ?? []).map((choice) => ({
              ...choice,
              url: choice.goto
                ? `${base}/${choice.goto.replace("./", room.id + "/")}`
                : undefined,
            })),
          })),
        )
        .flat();
    },
    addAllPagesToCollections: false,
  },
  permalink: "{{ adventure.base }}/{{ page.id }}.html",
  eleventyExcludeFromCollections: true,
};
