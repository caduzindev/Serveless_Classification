import { injectable, inject, Container } from "inversify";
import "reflect-metadata";

export interface Warrior {
    fight(): string;
    sneak(): string;
}

export interface Entity {
    save(): string
}
const TYPES = {
    Warrior: Symbol.for("Warrior"),
    Weapon: Symbol.for("Weapon"),
    ThrowableWeapon: Symbol.for("ThrowableWeapon")
};

@injectable()
class Katana implements Entity {
    public save() {
        return "cut!";
    }
}

@injectable()
class Shuriken implements Entity {
    public save() {
        return "hit!";
    }
}

@injectable()
class Ninja implements Warrior {

    private _katana: Entity;
    private _shuriken: Entity;

    public constructor(
        @inject(TYPES.Weapon) katana: Entity,
        @inject(TYPES.ThrowableWeapon) shuriken: Entity
    ) {
        this._katana = katana;
        this._shuriken = shuriken;
    }

    public fight() { return this._katana.save(); }
    public sneak() { return this._shuriken.save(); }

}

const myContainer = new Container();
myContainer.bind<Warrior>(TYPES.Warrior).to(Ninja);
myContainer.bind<Entity>(TYPES.Weapon).to(Katana);
myContainer.bind<Entity>(TYPES.ThrowableWeapon).to(Shuriken);

const ninja = myContainer.get<Warrior>(TYPES.Warrior)

console.log(ninja.fight());
