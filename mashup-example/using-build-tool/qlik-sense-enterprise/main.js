import nuked from './configure';
import './style.css';

async function run() {
  const selectionsToolbarElement = document.getElementById('selections');
  const filterElement = document.getElementById('filter');

  const selections = await nuked.selections();
  selections.mount(selectionsToolbarElement);

  const field = await nuked.field('Case Owner Group');
  field.mount(filterElement, { title: 'Department' });

  nuked.render({
    element: document.querySelector('.object'),
    type: 'table',
    fields: ['Number of New Cases', 'Number of Closed Cases', 'Priority'],
  });
}

run();
