class Thingy {
    constructor() {
        this.messageBox = document.querySelector("#messageBox");
        this.messageBoxButton = document.querySelector("#messageBox button.button");
        this.messageBoxH3 = document.querySelector("#messageBox h3");
        this.messageBoxP = document.querySelector("#messageBox p");
        this.messageBoxButton.addEventListener("click", () => {
            messageBox.close();
        });
    }

    translateText(text) {
        return text.toUpperCase().replaceAll("S", "Z").replaceAll("F", "PH").replaceAll("CH", "ZH").replaceAll("C", "Q").replaceAll("K", "Q").replaceAll("V", "W");
    }

    parseNodeTree(childNode) {
        if (childNode.nodeName === "#text") {
            childNode.nodeValue = this.translateText(childNode.nodeValue);
        }

        if (childNode.hasAttribute?.("alt")) {
            childNode.setAttribute("alt", this.translateText(childNode.getAttribute("alt")));
        }


        for (let i = 0; i < childNode.childNodes.length; i++) {
            this.parseNodeTree(childNode.childNodes[i]);
        }
    }

    autoTranslate() {

        document.getElementById("CoverImage").setAttribute("src", "./assets/images/GETQODING_cutdown.png");
        document.documentElement.style.fontFamily = "RunicalScript";
        document.documentElement.style.fontSizeAdjust = "0.8";
        document.documentElement.setAttribute("lang", "zq");
        this.parseNodeTree(document.getRootNode());
    }

    WriteSillyText(text) {
        if (document.documentElement.getAttribute("lang") === "zq") {
            text = this.translateText(text);
        }

        const sillyText = document.querySelector("#SillyText h3");
        sillyText.innerHTML = "";
        let delay = 0;

        text.split("").forEach(char => {
            const span = document.createElement("span");
            span.style.animationDelay = delay + "ms";
            span.innerText = char;
            if (char === "_") {
                span.style.visibility = "hidden";
            }
            delay += 300;
            sillyText.appendChild(span);
        });
        document.querySelector("#SillyText").showModal();
    }

    transferToRussianMafia() {
        document.querySelector(".transferingToRussianMafia").showModal();
        setTimeout(() => {
            document.querySelector(".transferingToRussianMafia").close();
        }, 4000);
    }

    ShowGDPR() {
        document.querySelector("dialog.IlligalGDPRDialog").showModal();

        document.querySelector("#acceptEvilGDPRImplementation").addEventListener("click", () => {
            document.querySelector("dialog.IlligalGDPRDialog").close();
            this.transferToRussianMafia();
        });

        document.querySelector("#rejectEvilGDPRImplementation").addEventListener("click", () => {
            //alert("the rejection button is undergoing maintenace at present please try again later...");

            this.showMessageBox("Reject all broken", "The reject button is undergoing mainenance and is not avalible at the moment", "Ok");

        });

        let rotation = 0;
        document.querySelector("div.evil").addEventListener("mouseenter", () => {
            rotation += 180;
            document.querySelector("div#ButtonWrapper").style.transition = "transform 500ms";
            document.querySelector("div#ButtonWrapper").style.transform = `rotate(${rotation}deg)`;
            document.querySelectorAll("div#ButtonWrapper button").forEach(n => n.style.transition = "transform 500ms");
            document.querySelectorAll("div#ButtonWrapper button").forEach(n => n.style.transform = `rotate(-${rotation}deg)`);
        });
    }

    showMessageBox(title, message, btn) {
        this.messageBoxButton.textContent = btn;
        this.messageBoxH3.textContent = title;
        this.messageBoxP.textContent = message;
        this.messageBox.showModal();
    }
}

document.addEventListener("readystatechange", e => {
    let thingy = new Thingy();

    if (document.readyState === "complete") {
        document.querySelector("#translate").addEventListener("click", () => {
            thingy.autoTranslate();
        });

        document.querySelector("#invert").addEventListener("click", () => {
            document.documentElement.style.filter = "invert()";
        });

        document.querySelector("#somethingElse").addEventListener("click", () => {
            thingy.WriteSillyText("Meow!_=^-^=")
        });

        document.querySelector("#sillyGdrpParody").addEventListener("click", () => {
            thingy.ShowGDPR();
        });
    }
});