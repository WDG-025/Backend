import "#db";
import { Post, User } from "#models";

// const user = { name: "Alice", age: 25 };
// await db.collection("user").insertOne(user);

// # CREATE (Variante 1): new User(...) + .save()
// const user = new User({
//   firstName: "John",
//   lastName: "Doe",
//   email: "john@example.com",
// });

// const userToSave = await user.save();
// console.log(userToSave);

// # CREATE (Variante 2): User.create(...)
// const newUser = await User.create({
//   firstName: "Jane",
//   lastName: "Doe",
//   email: "jane@example.com",
// });

// console.log(newUser);

// const newUser = await User.create({
//   firstName: "",
//   lastName: "",
//   email: "",
// });

// console.log(newUser);

// * Read
// const allUsers = await User.find();
// console.log(allUsers);

// const findJohn = await User.find({ firstName: "John" });
// console.log(findJohn);

// const findJane = await User.find({ firstName: "Jane" });
// console.log(findJane);

// const findByEmail = await User.find({ email: "jane@example.com" });
// console.log(findJane);

// const findById = await User.findById("694565be040f5c2ad7c2b6e6");
// console.log(findById);

// * Update
// const updateJohn = await User.updateOne(
//   { email: "john@example.com" },
//   { firstName: "Jack" },
// );
// console.log(updateJohn);

// const userRole = await User.updateMany({ lastName: "Doe" }, { role: "admin" });
// console.log(userRole);

// const findAndUpdate = await User.findOneAndUpdate(
//   { email: "john@example.com" },
//   { firstName: "updated again" },
//   { new: true },
// );
// console.log(findAndUpdate);

// const findByIdAndupdate = await User.findByIdAndUpdate(
//   "694565be040f5c2ad7c2b6e6",
//   { firstName: "John" },
//   { new: true },
// );
// console.log(findByIdAndupdate);

// * Delete
// const deleteOne = await User.deleteOne({ email: "john@example.com" });
// console.log(deleteOne);

// const deleteById = await User.findByIdAndDelete("694570a544b1de3ecf09d2ba");
// console.log(deleteById);

// const newUser = await User.create({
//   firstName: "New",
//   lastName: "User",
//   email: "newuser2@example.com",
// });

// const newPost = await Post.create({
//   title: "Mein erster Post",
//   content: "Hallo Mongoose!",
//   author: newUser._id,
// });

// console.log(newPost);

// const postWithUser = await Post.find().populate("author", "firstName lastName");
// console.log(postWithUser);

// 2nd query done automatically by mongoose via .populate()
// User.findById("authorId", "firstname lastName");
