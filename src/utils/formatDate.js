const formatDate = (date) => {
    const newDate = new Date(date);
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = newDate
        .toLocaleDateString("en-US", options)
        .replace(/ /g, "/");
    return formattedDate.replace(",", "");
};

export default formatDate;