const checkPermissions = () => {
  if (!("serviceWorker" in navigator)) {
    throw new Error("not support service workers");
  }
  if (!("Notification" in navigator)) {
  }
};
const registerService = async () => {
  const register = await navigator.serviceWorker.register("sw.js");
  return register;
};

const requestPermission = async () => {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error("Permission Not Granted");
  } else {
    new Notification("Hello from the other side");
  }
};

const notify = async () => {
  checkPermissions();
  let registration = await registerService();
  registration.showNotification("hello from service", {
    icon: "/img1.png",
    image: "https://cdn-icons-png.flaticon.com/512/3119/3119338.png",
    body: "Simple piece of body text./nSecond line of body text :)",
  });
};
notify();
