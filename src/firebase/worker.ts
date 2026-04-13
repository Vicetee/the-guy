import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./config";

export interface Worker {
  id: string;
  name: string;
  trade: string;
  location: string;
  gender: "male" | "female";
  phone: string;
  whatsapp: string;
  bio: string;
  photoUrl: string;
  verified: boolean;
  yearsExp: number;
}

export interface WorkerFormData {
  name: string;
  trade: string;
  location: string;
  gender: "male" | "female";
  phone: string;
  whatsapp: string;
  bio: string;
  yearsExp: number;
  photo?: File;
}

export async function findWorkers(
  trade: string,
  location: string,
  gender: string
): Promise<Worker[]> {
  const constraints = [
    where("trade", "==", trade.toLowerCase().trim()),
    where("location", "==", location.toLowerCase().trim()),
  ];
  if (gender !== "any") {
    constraints.push(where("gender", "==", gender));
  }
  const q = query(collection(db, "workers"), ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Worker, "id">) }));
}

export async function registerWorker(data: WorkerFormData): Promise<void> {
  let photoUrl = "";
  if (data.photo) {
    const storageRef = ref(storage, `workers/${Date.now()}_${data.photo.name}`);
    await uploadBytes(storageRef, data.photo);
    photoUrl = await getDownloadURL(storageRef);
  }

  await addDoc(collection(db, "workers"), {
    name: data.name,
    trade: data.trade.toLowerCase().trim(),
    location: data.location.toLowerCase().trim(),
    gender: data.gender,
    phone: data.phone,
    whatsapp: data.whatsapp,
    bio: data.bio,
    yearsExp: Number(data.yearsExp),
    photoUrl,
    verified: false,
    createdAt: serverTimestamp(),
  });
}