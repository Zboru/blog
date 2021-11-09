---
title: Komunikacja między Canvas (Fabric) a Vue.js
description: Spraw by Canvas i Vue mogli się porozumieć
created_at: 1635161069473
---

# *TL:DR użyj drugiej instancji Vue jako Event Bus*

Ostatnio miałem problem z rozwiązaniem komunikacji między Canvas'em, a Vue.js, który miał obsługiwać interfejs. Canvas ma za zadanie wizualizować następne kroki gry tekstowej, więc potrzebuje obsłużyć interakcje, takie jak wybranie kroku i wyświetlenie jego szczegółów, usunięcie kroku, czy inne, które przyjdą mi do głowy.

Problemem jest to, że nie jesteśmy w prosty sposób przechwycić tych informacji ze względu na to, że elementy Canvas'u nie są elementami DOM, przez co użycie @click jest niemożliwe. Musimy znaleźć sposób aby powiadomić Vue, że przykładowo w momencie kliknięcia w dany obiekt na płótnie ma on wyświetlić szczegóły kroku tworzonej gry.

## Rozwiązanie 1 - prymitywne, w pewnym sensie działające

```js
import { fabric } from 'fabric';
class Canvas {
  constructor() {
    ...
    this.canvas = null;
		this.selectedNode = null;
	}
	init() {
    this.canvas = new fabric.Canvas('c', {
      backgroundColor: '#C4C4C4',
      selection: false,
    });
		this.registerCanvasEvents();
	}
	registerCanvasEvents() {
		...
		this.canvas.on('mouse:dblclick', (options) => {
      this.selectNode(options);
    });
	}
}
```

```js
import Canvas from '../canvas/canvas';
export default {
  name: 'CreateNewGame',
	data() {
	    return {
	      canvas: new Canvas(),
				dialogs: {
					step_details: false,
				}
			}
	},
	computed: {
		selectedNode() {
      return this.canvas.selectedNode;
    },
	},
	mounted() {
		this.canvas.init();
	}
}
```

> Pomijam tutaj większość kodu komponentu czy logiki Canvas, ponieważ nie jest to wymagane w opisaniu problemu.

W przedstawionych blokach kodu można zauważyć kilka rzeczy:

- Utworzenie klasy Canvas, w której zawarta jest inicjalizacja fabric'a oraz rejestracja eventów związanych z samym canvasem
- Konfiguracja komponentu CreateNewGame

```js
// Select desired node by double-clicking it
selectNode(options) {
  this.selectedNode = options.target;
  this.currentMode = 'edit';
}
```

```js
export default {
	...
	watch: {
		selectedNode(value) {
      if (value !== null && value.type === 'group') {
        if (this.currentMode === 'edit') {	
					// Logika dotycząca kroku...
				}
				this.dialogs.step_details = true;
			}
		}
	}
}
```

Cała sztuczka polegała na tym, że klikając podwójnie na element płótna, przypisywaliśmy go do zmiennej selectedNode w klasie Canvas. Vue cały czas miał wgląd do niej poprzez właściwość selectedNode w computed. W momencie zmiany elementu, Vue ma wyświetlić dialog dot. szczegółów kroku gry.

I w założeniu wszystko powinno działać poprawnie, ponieważ klikamy na różne kroki i wyświetla nam się dialog z ich szczegółami. Tylko co jeśli po zamknięciu dialogu klikniemy podwójnie na ten sam krok?

W takim momencie skrypt nie zadziała poprawnie, ponieważ element jest ten sam, przez co Vue nie wykrywa zmiany i dialog nie zostaje wyświetlony.

Rozwiązaniem jest zresetowanie zmiennej przed przypisaniem do niej elementu.

```js
// Select desired node by double-clicking it
selectNode(options) {
	// Reset selected node so Vue can register change when for example
  // user is clicking same node second time
  this.selectedNode = null;

  this.selectedNode = options.target;
  this.currentMode = 'edit';
}  
```

Rezultat? Wszystko działa jak należy, można klikać różne, bądź te same kroki i dialog wyświetla się za każdym razem. Niestety to rozwiązanie pozostawia po sobie niesmak, tak jakbym obszedł problem jakimiś magicznymi metodami.

## Rozwiązanie 2 - Odpowiednie i uniwersalne

Cały czas zadawałem sobie pytanie: "W jaki sposób mogę przekazać informacje między sobą w podobny sposób jaki to robi Vue?". I wtedy mnie oświeciło, wystarczy użyć nowej instancji Vue jako Event Bus.

```js
import { fabric } from 'fabric';
import Vue from 'vue';
class Canvas {
  constructor() {
    ...
		this.vue = new Vue();
    this.canvas = null;
		this.selectedNode = null;
	}
	...
}
```

```js
// Select desired node by double-clicking it
selectNode(options) {
  if (options.target.type === 'group') {
    this.selectedNode = options.target;
    this.vue.$emit('editNode', this.selectedNode);
  }
}
```

W ten sposób możemy użyć metody $emit, aby wysłać sygnał zawierający wybrany element do naszej głównej instancji. Następnie wystarczy tylko dodać nasłuchiwanie poprzez metodę $on odwołując się do naszej drugiej instancji Vue, za pomocą `this.canvas.vue`.

```js
export default {
  name: 'CreateNewGame',
	data() {
	    return {
	      canvas: new Canvas(),
				dialogs: {
					step_details: false,
				}
			}
	},
	mounted() {
		this.canvas.init();
		this.registerListeners();
	},
	methods: {
		registerListeners() {
          // Show dialog after double-clicking node
            this.canvas.vue.$on('editNode', (node) => {
              this.selectedStep = { ...this.game.steps[node.id] };
              this.dialogs.step_details = true;
            });
		}
	}
}
```

Rezultat? Wszystko działa poprawnie i jednocześnie czuje się dobrze z tym rozwiązaniem. Ten sposób nie opiera się na żadnych sztuczkach takich jak resetowanie zmiennych, które mogłyby wpłynąć w jakiś sposób na działanie aplikacji, tylko na precyzyjnym wskazaniu co się dzieje i co jest podmiotem.
