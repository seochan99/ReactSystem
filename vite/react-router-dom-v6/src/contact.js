import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

// 연락처 데이터를 로컬 스토리지에 저장합니다.
export async function getContacts(query) {
    await fakeNetwork(`getContacts:${query}`);
    let contacts = await localforage.getItem("contacts");
    if (!contacts) contacts = [];
    if (query) {
        contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
    }
    return contacts.sort(sortBy("last", "createdAt"));
}

// 연락처를 생성합니다.
export async function createContact() {
    await fakeNetwork();
    let id = Math.random().toString(36).substring(2, 9);
    let contact = { id, createdAt: Date.now() };
    let contacts = await getContacts();
    contacts.unshift(contact);
    await set(contacts);
    return contact;
}

// 연락처를 가져옵니다.
export async function getContact(id) {
    await fakeNetwork(`contact:${id}`);
    let contacts = await localforage.getItem("contacts");
    let contact = contacts.find((contact) => contact.id === id);
    return contact ?? null;
}

// 연락처를 업데이트합니다.
export async function updateContact(id, updates) {
    await fakeNetwork();
    let contacts = await localforage.getItem("contacts");
    let contact = contacts.find((contact) => contact.id === id);
    if (!contact) throw new Error("No contact found for", id);
    Object.assign(contact, updates);
    await set(contacts);
    return contact;
}

// 연락처를 삭제합니다.
export async function deleteContact(id) {
    let contacts = await localforage.getItem("contacts");
    let index = contacts.findIndex((contact) => contact.id === id);
    if (index > -1) {
        contacts.splice(index, 1);
        await set(contacts);
        return true;
    }
    return false;
}

// 연락처를 로컬 스토리지에 저장합니다.
function set(contacts) {
    return localforage.setItem("contacts", contacts);
}

//
let fakeCache = {};

async function fakeNetwork(key) {
    if (!key) {
        fakeCache = {};
    }

    if (fakeCache[key]) {
        return;
    }

    fakeCache[key] = true;
    return new Promise((res) => {
        setTimeout(res, Math.random() * 800);
    });
}
