import Anfis from "./entities/anfis/anfis";

let mins: number[] = [0.0, 35.6, 1.0, 1.0];
let maxs: number[] = [1000.0, 37.4, 100.0, 30.0];
let viborka: number[] = [5000.0, 39.4, 21.0, 1.0]
for (let i: number = 0; i < 4; i++) {
    viborka[i] = (viborka[i] - mins[i]) / (maxs[i] - mins[i])
}
let anfis: Anfis;
Anfis.instance(4,
    "newConditions.json",
    "newConclusions.json",
    mins,
    maxs).
then((anfis) =>
    anfis.predict(viborka).then(
        (answer) => console.log(`predict --- ${answer}`)
    )
)


