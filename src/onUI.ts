// HTML特殊文字を使えるようにした
const domParser: DOMParser = new DOMParser();
const parseHTMLcode = (code: string): string => {
    return String(domParser.parseFromString(code, 'text/html').body.textContent)
}

export class onUI {
    private selector: string = ''
    private toggle0Num: number = 0
    private toggle1Num: number = 0

    constructor() {
    }

    test(to: string) {
        console.log(`Hello ${to}`)
    }

        public select(id: string) {
            const reg = /^#.+/
            if (reg.test(id)) {
                this.selector = id
            }
            return this
        }

        public on(eventType: string, callback: Function) {
            const $me: HTMLElement = <HTMLElement>document.querySelector(this.selector)
            let allevent: string[] = ['click', 'dblclick', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'keypress', 'keyup', 'keydown', 'change', 'input']

            if ($me !== null) {
                if (allevent.find(e => e === eventType) != undefined) {
                    $me.querySelectorAll('input').forEach($input => {
                        $input.addEventListener(eventType, function (event) {
                            callback(event)
                        })
                    })
                }
            }

            return this
        }

        //　トグル用
        get checked(): boolean {
            const $me: HTMLElement = <HTMLElement>document.querySelector(this.selector)
            let type = $me.getAttribute('class')

            if (type === 'toggle-btn-box' || type === 'toggle-switch-box') {
                let $input: HTMLInputElement = <HTMLInputElement>$me.querySelector('input')
                return $input.checked
            }

            return false
        }
        set checked(flag: boolean) {
            const $me: HTMLElement = <HTMLElement>document.querySelector(this.selector)
            let type = $me.getAttribute('class')

            if (type === 'toggle-btn-box' || type === 'toggle-switch-box') {
                let $input: HTMLInputElement = <HTMLInputElement>$me.querySelector('input')
                $input.checked = flag
            }

        }

        // フォントセレクタ用
        get font(): string {
            const $me: HTMLElement = <HTMLElement>document.querySelector(this.selector)

            if ($me.getAttribute('class') === 'font-selector-box') {
                const $label: HTMLElement = <HTMLElement>$me.querySelector('.label')
                String($label.style.fontFamily)
                return String($label.style.fontFamily)
            }

            return ''
        }

        // スライダ用
        get val(): string {
            const $me: HTMLElement = <HTMLElement>document.querySelector(this.selector)
            let type = $me.getAttribute('class')

            if (type === 'mulitslider-box') {
                const $slider0: HTMLInputElement = <HTMLInputElement>$me.querySelector('.primary')
                const $slider1: HTMLInputElement = <HTMLInputElement>$me.querySelector('.secondary')

                const min: number = Math.min(Number($slider0.value), Number($slider1.value))
                const max: number = Math.max(Number($slider0.value), Number($slider1.value))
                return `${min},${max}`
            }

            return ''
        }

        set val(v: string) {
            const $me: HTMLElement = <HTMLElement>document.querySelector(this.selector)
            let type = $me.getAttribute('class')

            if (type === 'multislider-box') {
                let value: string[] = v.split(',')
                const $slider0: HTMLInputElement = <HTMLInputElement>$me.querySelector('.primary')
                const $slider1: HTMLInputElement = <HTMLInputElement>$me.querySelector('.secondary')

                $slider0.value = value[0]
                $slider1.value = value[1]
            }
        }


        // メニュー用
        get active(): number {
            const $me: HTMLElement = <HTMLElement>document.querySelector(this.selector)
            let type = $me.getAttribute('class')

            // メニュー系
            if (type === 'accordion' || type === 'tab') {
                let num: number = -1
                $me.querySelectorAll('input').forEach((e, i) => {
                    if (e.checked) num = i
                })

                return num
            }
            return -1
        }
        set active(targetIdx: number) {
            const $me: HTMLElement = <HTMLElement>document.querySelector(this.selector)
            let type = $me.getAttribute('class')
            // メニュー系
            if (type === 'accordion') {
                // 複数のinput要素
                $me.querySelectorAll('input').forEach((e, idx) => {
                    if (idx === targetIdx) {
                        e.checked = true
                    } else {
                        e.checked = false
                    }
                })
                $me.querySelectorAll('.accordion-item').forEach((e, idx) => {
                    const $item: HTMLElement = <HTMLElement>e
                    if (idx === targetIdx) {
                        $item.style.display = 'block'
                    } else {
                        $item.style.display = 'none'
                    }
                })
            }
            if (type === 'tab') {
                // 複数のinput要素
                $me.querySelectorAll('input').forEach((e, idx) => {
                    if (idx === targetIdx) {
                        e.checked = true
                    } else {
                        e.checked = false
                    }
                })
                $me.querySelectorAll('.tab-item').forEach((e, idx) => {
                    const $item: HTMLElement = <HTMLElement>e
                    if (idx === targetIdx) {
                        $item.style.display = 'block'
                    } else {
                        $item.style.display = 'none'
                    }
                })
            }
        }

        public toggleSwitch() {
            const $toggleSw: HTMLElement = <HTMLElement>document.querySelector(this.selector)
            $toggleSw.classList.add("toggle-switch-box")

            const id: string = $toggleSw.getAttribute('id') != null ? `${$toggleSw.getAttribute('id')}-toggle-sw${this.toggle0Num}` : `toggle-sw${this.toggle0Num}`

            let $chbox: HTMLInputElement = <HTMLInputElement>document.createElement('input')
            $chbox.setAttribute('type', 'checkbox')
            $chbox.setAttribute('id', id)

            let $label: HTMLElement = document.createElement("label")
            $label.setAttribute('for', id)
            $label.classList.add('check')

            let $thumb: HTMLElement = document.createElement('div')
            $thumb.classList.add('thumb')
            $label.appendChild($thumb)

            $toggleSw.appendChild($chbox)
            $toggleSw.appendChild($label)

            this.toggle0Num++

            return this
        }

        public toggleBtn(text: string) {
            const $box: HTMLElement = <HTMLElement>document.querySelector(this.selector)
            $box.classList.add('toggle-btn-box')

            let id: string = $box.getAttribute('id') == null ? `${$box.getAttribute('id')}-toggle-btn${this.toggle1Num}` : `toggle-btn${this.toggle1Num}`
            $box.textContent = ''

            const $chbox: HTMLInputElement = <HTMLInputElement>document.createElement('input')
            $chbox.setAttribute('type', 'checkbox')
            $chbox.setAttribute('id', id)
            $chbox.classList.add('toggle-btn')

            const $label = document.createElement('label')
            $label.textContent = text
            $label.setAttribute('for', id)
            // $label.classList.add(cla)
            $label.classList.add('check')

            $box.appendChild($chbox)
            $box.appendChild($label)

            this.toggle1Num++

            return this
        }

        public fontSelector(fontList: string[]) {
            // 外箱の作成
            const $selectBox: HTMLElement = <HTMLElement>document.querySelector(this.selector)
            let id: string = $selectBox.getAttribute('id') !== null ? `${$selectBox.getAttribute('id')}-font` : ''

            // const $selectBox: HTMLElement = <HTMLElement>elem
            $selectBox.classList.add('font-selector-box')
            // ドロップダウンリスト
            const $list: HTMLElement = document.createElement("div")
            $list.classList.add('list')

            const $label: HTMLElement = document.createElement("div")
            $label.classList.add('label')

            const $btn: HTMLElement = document.createElement("div")
            $btn.classList.add('down-btn')
            $btn.textContent = parseHTMLcode("&#9660;")

            fontList.forEach(function (font: string, idx: number) {
                const text: string = font.replace(/["']/g, '')
                const $item: HTMLInputElement = <HTMLInputElement>document.createElement('input')
                $item.setAttribute('type', 'radio')
                $item.setAttribute('name', id)
                $list.appendChild($item)

                // 最初の選択肢をデフォルトの選択肢にする
                if (idx === 0) {
                    $item.checked = true
                    $label.textContent = text
                    $label.style.fontFamily = font
                } else {
                    $item.checked = false
                }

                // ドロップダウンでみえる選択肢
                let $listLabel = document.createElement('label')
                $listLabel.textContent = text
                $listLabel.setAttribute('for', String(idx))
                $listLabel.classList.add('item')
                $listLabel.style.fontFamily = font
                $list.appendChild($listLabel)

                // ラジオボタンは非表示にして、上のラベルと対応させる
                $item.classList.add('radio')
                $item.setAttribute('id', String(idx))

                // チェックが入ってるやつをデフォルトに
                if ($item.checked) {
                    $label.textContent = text
                }
            })

            $selectBox.appendChild($btn)
            $selectBox.appendChild($label)
            $selectBox.appendChild($list)

            $label.addEventListener('click', function () {
                if ($list.style.display = "none") {
                    $list.style.display = "block"
                } else {
                    $list.style.display = "none"
                }
            })

            $list.querySelectorAll('.item').forEach(function (elem: Element, i: number) {
                const me = <HTMLElement>elem
                elem.addEventListener('click', function () {
                    let dv: any = document.defaultView
                    if (dv != null) {
                        const font: string = dv.getComputedStyle(elem, null).fontFamily
                        $label.style.fontFamily = font
                    }
                    const text: string = String(elem.textContent)
                    $label.textContent = text
                    $list.style.display = 'none'
                })
            })

            return this
        }


        public accordion(labelList: string[]) {
            const $accordionBox: HTMLElement = <HTMLElement>document.querySelector(this.selector)
            $accordionBox.classList.add('accordion')

            $accordionBox.querySelectorAll('.accordion-item').forEach(function (elem, idx) {
                const $item: HTMLElement = <HTMLElement>elem
                // $item.classList.add('accordion-item')

                const id: string = $accordionBox.getAttribute('id') != null ? String($accordionBox.getAttribute('id')) : ''
                const isCheck = false


                const $label: HTMLElement = document.createElement('label')
                $label.setAttribute('for', `${id}-hide-btn${idx}`)
                $label.textContent = labelList[idx] !== undefined ? labelList[idx] : parseHTMLcode('&nbsp;')

                const $btn: HTMLElement = document.createElement('span')
                $btn.textContent = parseHTMLcode('&#9650;')
                $btn.classList.add('hide-btn')

                $label.appendChild($btn)

                const $chbox: HTMLInputElement = <HTMLInputElement>document.createElement('input')
                $chbox.setAttribute('id', `${id}-hide-btn${idx}`)
                $chbox.setAttribute('type', 'checkbox')
                $chbox.classList.add('hide-checkbox')
                $chbox.checked = isCheck


                $item.insertAdjacentElement("beforebegin", $label)
                $item.insertAdjacentElement("beforebegin", $chbox)

                if (!isCheck) {
                    $btn.textContent = parseHTMLcode('&#9660;')
                    $item.style.display = 'none'
                }

                $chbox.addEventListener('input', function () {
                    const isShow: boolean = $chbox.checked

                    $accordionBox.querySelectorAll('.accordion-item').forEach(function (elem) {
                        let $me: HTMLElement = <HTMLElement>elem
                        $me.style.display = 'none'
                    })
                    $accordionBox.querySelectorAll('.hide-checkbox').forEach(function (elem) {
                        let $me: HTMLInputElement = <HTMLInputElement>elem
                        $me.checked = false
                    })
                    $accordionBox.querySelectorAll('.hide-btn').forEach(function (elem) {
                        let $me: HTMLInputElement = <HTMLInputElement>elem
                        $me.textContent = parseHTMLcode('&#9660;')
                    })

                    $chbox.checked = isShow
                    if (isShow) {
                        $btn.textContent = parseHTMLcode('&#9650;')
                        $item.style.display = 'block'
                    } else {
                        $btn.textContent = parseHTMLcode('&#9660;')
                        $item.style.display = 'none'
                    }
                })
            })

            return this
        }

        public multiSlider() {
            const $me: HTMLInputElement = <HTMLInputElement>document.querySelector(this.selector)
            const id: string = String($me.getAttribute('id'))
            const min: string = String($me.getAttribute('min'))
            const max: string = String($me.getAttribute('max'))
            const step: string = String($me.getAttribute('step'))
            const val: string[] = String($me.getAttribute('value')).split(',')

            // 外枠
            const $sliderBox: HTMLElement = document.createElement('div')
            $sliderBox.classList.add('mulitslider-box')
            $sliderBox.setAttribute('id', id)
            $me.insertAdjacentElement("beforebegin", $sliderBox)
            $me.remove()

            // メインのスライダ
            const $slider0: HTMLInputElement = document.createElement('input')
            $slider0.classList.add('primary')
            $slider0.setAttribute('type', 'range')
            $slider0.setAttribute('min', min)
            $slider0.setAttribute('max', max)
            $slider0.setAttribute('step', step)
            $slider0.value = val[0]

            // サブのスライダ
            const $slider1: HTMLInputElement = document.createElement('input')
            $slider1.classList.add('secondary')
            $slider1.setAttribute('type', 'range')
            $slider1.setAttribute('min', min)
            $slider1.setAttribute('max', max)
            $slider1.setAttribute('step', step)
            $slider1.value = val[1]

            $sliderBox.appendChild($slider0)
            $sliderBox.appendChild($slider1)

            updateSlider()

            function updateSlider() {
                const vmin: number = Math.min(Number($slider0.value), Number($slider1.value))
                const vmax: number = Math.max(Number($slider0.value), Number($slider1.value))

                const min: number = Number($slider0.getAttribute('min'))
                const max: number = Number($slider0.getAttribute('max'))

                let ratio0: number = Math.round((vmin - min) / (max - min) * 100)
                let ratio1: number = Math.round((vmax - min) / (max - min) * 100)

                $slider0.style.background = `linear-gradient(90deg, #444 ${ratio0}%, #4287f5 ${ratio0}%, #4287f5 ${ratio1}%, #444 ${ratio1}%)`
            }
            $slider0.addEventListener('input', function (elem) {
                updateSlider()
            })
            $slider1.addEventListener('input', function (elem) {
                updateSlider()
            })

            return this
        }

        public tab(labelList: string[]) {
            const $tabBox: HTMLElement = <HTMLElement>document.querySelector(this.selector)
            $tabBox.classList.add('tab')

            const $selectorBox: HTMLElement = document.createElement('div')
            $selectorBox.classList.add('selector-box')

            $tabBox.querySelectorAll('.tab-item').forEach(function (elem, idx) {
                const $item: HTMLElement = <HTMLElement>elem
                // $item.classList.add('tab-item')

                const id: string = $tabBox.getAttribute('id') != null ? String($tabBox.getAttribute('id')) : ''

                const $label: HTMLElement = document.createElement('label')
                $label.setAttribute('for', `${id}-tab-btn${idx}`)
                $label.classList.add('tab-label')
                $label.textContent = labelList[idx] !== undefined ? labelList[idx] : parseHTMLcode('&nbsp;')

                const $radioBtn: HTMLInputElement = <HTMLInputElement>document.createElement('input')
                $radioBtn.setAttribute('id', `${id}-tab-btn${idx}`)
                $radioBtn.setAttribute('type', 'radio')
                $radioBtn.setAttribute('name', id)
                if (idx === 0) $radioBtn.checked = true
                else $radioBtn.checked = false

                $selectorBox.appendChild($radioBtn)
                $selectorBox.appendChild($label)

                if (!$radioBtn.checked) {
                    $item.style.display = 'none'
                }

                $radioBtn.addEventListener('input', function () {
                    const isShow: boolean = $radioBtn.checked

                    $tabBox.querySelectorAll('.tab-item').forEach(function (elem) {
                        let $me: HTMLElement = <HTMLElement>elem
                        $me.style.display = 'none'
                    })

                    if (isShow) {
                        $item.style.display = 'block'
                    } else {
                        $item.style.display = 'none'
                    }
                })
            })

            $tabBox.insertAdjacentElement("afterbegin", $selectorBox)

            return this
        }
}

// export default onUI