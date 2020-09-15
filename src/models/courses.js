class Courses {
  constructor(
    id,
    uid,
    title,
    subtitle,
    category,
    totalLesson,
    price,
    images,
    description,
    rating,
    ratingSum,
  ) {
    this.id = id;
    this.uid = uid;
    this.title = title;
    this.subtitle = subtitle;
    this.category = category;
    this.totalLesson = totalLesson;
    this.price = price;
    this.images = images;
    this.description = description;
    this.rating = rating;
    this.ratingSum = ratingSum;
  }
}

export default Courses;
