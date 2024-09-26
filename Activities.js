const HUNDRED_PERCENT = 100; // Egy konstans érték a százalékok kiszámításához

let activities = []; // Ez tárolja az aktivitásokat

// Ez a függvény visszaadja azokat az aktivitásokat, amelyeknél a 'secondsToComplete' nem 0
export function getTrackedActivities() {
  return activities.filter(({ secondsToComplete }) => secondsToComplete !== 0);
}

// Ez a függvény legenerálja az aktivitások select (választási) opcióit, ahol minden aktivitásból létrejön egy { value, label } pár
export function getActivitySelectOptions() {
  return generateActivitySelectOptions(activities);
}

// Ez a függvény inicializálja az aktivitásokat az állapot (state) alapján
export function initializeActivities(state) {
  activities = state.activities || [];
}

// Ez a függvény hozzáad egy új aktivitást az 'activities' tömbhöz
export function createActivity(activity) {
  activities.push(activity);
}

// Ez a függvény frissíti a meglévő aktivitást a megadott új mezőkkel (fields)
export function updateActivity(activity, fields) {
  return Object.assign(activity, fields); // Az Object.assign egy új objektumot hoz létre a megadott változtatásokkal
}

// Ez a függvény törli az adott aktivitást az 'activities' tömbből
export function deleteActivity(activity) {
  const index = activities.indexOf(activity);
  if (index > -1) {
    activities.splice(index, 1); // A splice eltávolítja az adott elemet a tömbből
  }
}

// Ez a függvény kiszámítja az egyes aktivitások befejezésének százalékos arányát
export function calculateActivityCompletionPercentage(activity, trackedSeconds) {
  const { secondsToComplete } = activity;
  return Math.floor((trackedSeconds * HUNDRED_PERCENT) / secondsToComplete);
}

// Ez a függvény kiszámítja az összes aktivitás befejezésének százalékos arányát
export function calculateCompletionPercentage(totalTrackedSeconds) {
  return Math.floor((totalTrackedSeconds * HUNDRED_PERCENT) / getTotalActivitySecondsToComplete());
}

// Ez a függvény összesíti a teljes 'secondsToComplete'-et az összes követett (tracked) aktivitás alapján
export function getTotalActivitySecondsToComplete() {
  return getTrackedActivities()
    .map(({ secondsToComplete }) => secondsToComplete)
    .reduce((total, seconds) => total + seconds, 0); // A reduce összegzi az összes követett másodpercet
}

// Ez a függvény generálja az aktivitások select opcióit, ahol az 'id' lesz az érték, és a 'name' lesz a címke
export function generateActivitySelectOptions(activities) {
  return activities.map((activity) => ({
    value: activity.id, // Ez lesz a select opció értéke
    label: activity.name // Ez lesz a select opció címkéje
  }));
}
