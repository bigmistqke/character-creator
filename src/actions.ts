import { unwrap } from "solid-js/store"
import { scale } from "./lib/transforms/scale"
import { sum } from "./lib/transforms/sum"
import tweener from "./helpers/tweener"
import { store, setStore } from "./Store"
import { MorphsDictionary, PoseNode } from "./helpers/helpers"

export const setPose = (pose: PoseNode) => {
  if (!store.skeleton) return false

  const walk = (skeleton: THREE.Object3D, pose: PoseNode, layer: number) => {
    if (!pose) return

    skeleton.position.x = pose.position.x
    skeleton.position.y = pose.position.y
    skeleton.position.z = pose.position.z

    if ("x" in pose.rotation) {
      skeleton.rotation.x = pose.rotation.x
      skeleton.rotation.y = pose.rotation.y
      skeleton.rotation.z = pose.rotation.z
    } else {
      skeleton.rotation.x = pose.rotation._x
      skeleton.rotation.y = pose.rotation._y
      skeleton.rotation.z = pose.rotation._z
    }

    skeleton.scale.x = pose.scale.x
    skeleton.scale.y = pose.scale.y
    skeleton.scale.z = pose.scale.z

    skeleton.children.forEach((node, index) =>
      walk(node, pose.children[index], layer + 1)
    )
  }
  walk(unwrap(store.skeleton), pose, 0)
}

export const tween = <T>(from: T, to: T, callback: (value: T) => void) => {
  const diff = sum(from, to, false)
  tweener((delta) => {
    callback(sum(from, scale(diff, delta), false))
  })
}

export const tweenPose = (from: PoseNode, to: PoseNode) => {
  tween(from, to, (pose) => {
    setPose(pose)
    dirty()
  })
}

export const tweenMorphsDictionaries = function (
  from: MorphsDictionary,
  to: MorphsDictionary
) {
  from = JSON.parse(JSON.stringify(from))
  to = JSON.parse(JSON.stringify(to))

  tween(from, to, (morphs) => {
    setMorphsDictionary(morphs)
    dirty()
  })
}

export const setMorphsDictionary = (dictionary: MorphsDictionary) =>
  Object.keys(dictionary).forEach((key) => {
    setStore("morphs", "dictionary", key, "value", +dictionary[key].value)
  })

export const dirty = () => setStore("dirty", true)
