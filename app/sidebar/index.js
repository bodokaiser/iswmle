import element from 'dekujs/virtual-element'

export default function render(component) {
    let {props} = component

    return <a class="list-group-item">
        <h4 class="list-group-item-heading">{props.heading}</h4>
        <p class="list-group-item-text">{props.description}</p>
        <div class="btn-group btn-group-justified">
          <div class="btn-group">
            <button class="btn btn-sm btn-success" type="button">Yes</button>
          </div>
          <div class="btn-group">
            <button class="btn btn-sm btn-danger" type="button">No</button>
          </div>
        </div>
      </a>
}