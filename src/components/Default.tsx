import { batch } from "solid-js"
import { unwrap } from "solid-js/store"
import { dirty, tweenMorphsDictionaries, tweenPose } from "../actions"
import { clone, skeletonToPose } from "../helpers/helpers"
import { scale } from "../lib/transforms/scale"
import { store } from "../Store"
import { headerButton, panel } from "../styles"

const Default = () => {
  const setDefault = () => {
    batch(() => {
      if (!store.skeleton || !store.morphs?.dictionary || !store.defaultPose)
        return
      tweenPose(skeletonToPose(store.skeleton), unwrap(store.defaultPose))
      tweenMorphsDictionaries(
        store.morphs.dictionary,
        scale(clone(store.morphs.dictionary), 0)
      )
      dirty()
    })
  }

  return (
    <div class={panel}>
      <button class={headerButton} onClick={setDefault} innerHTML="default" />
    </div>
  )
}
export default Default
