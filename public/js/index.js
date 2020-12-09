const provider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore();

// cached DOM elements
const signInElement = document.querySelector('.sign-in');
const signOutElement = document.querySelector('.sign-out');
const preAuthContainer = document.querySelector('.pre-auth-container');
const profileElement = document.querySelector('.profile');
const avatarElement = document.querySelector('.avatar img');
const appContainer = document.querySelector('.app-container');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const modalLesson = document.querySelector('.modal-lesson');
const modalLessonClose = document.querySelector('.modal-lesson-close');
const modalLessonTitle = document.querySelector('.modal-lesson-title');
const modalLessonContent = document.querySelector('.modal-lesson-content');
const createLessonContainer = document.querySelector(
	'.create-lesson-container',
);
const lessonInput = document.querySelector('.create-lesson-input');
const formElement = document.querySelector('form');
const submitLessonElement = document.querySelector('#submit');
const lessonsContainer = document.querySelector('.lessons');
const clearBtn = document.querySelector('.create-lesson-clear');

let isAuthReady = false;

// event listener setup
formElement.addEventListener('submit', addLesson);
modalLessonClose.addEventListener('click', handleCloseLessonModal);
clearBtn.addEventListener('click', handleClear);
overlay.addEventListener('click', handleCloseLessonModal);

if (!isAuthReady) {
	appContainer.setAttribute('hidden', '');
	profileElement.setAttribute('hidden', '');
	preAuthContainer.removeAttribute('hidden');
	overlay.setAttribute('hidden', '');
	modal.setAttribute('hidden', '');
}

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		if (!isAuthReady) {
			isAuthReady = true;
			init(user);
		}
	} else {
		appContainer.setAttribute('hidden', '');
		profileElement.setAttribute('hidden', '');
		preAuthContainer.removeAttribute('hidden');
		overlay.removeAttribute('hidden');
		modal.removeAttribute('hidden');
	}
});

function handleClear(e) {
	quill.root.innerHTML = '';
	lessonInput.value = '';
	clearBtn.setAttribute('hidden', '');
	submitLessonElement.textContent = 'ADD LESSON';
}

function handleCloseLessonModal() {
	modalLessonTitle.innerHTML = '';
	modalLessonContent.innerHTML = '';

	modalLesson.setAttribute('hidden', '');
	overlay.setAttribute('hidden', '');
	overlay.classList.remove('dark');
}

function init(user) {
	quill.root.focus();
	renderLessons()
		.then(() => {
			appContainer.removeAttribute('hidden');
			profileElement.removeAttribute('hidden');
			modal.setAttribute('hidden', '');
			preAuthContainer.setAttribute('hidden', '');
			overlay.setAttribute('hidden', '');
			avatarElement.setAttribute('src', user.photoURL);
		})
		.catch(console.log);
}

function handleEditClick(lesson) {
	// get lesson title and content
	const title = lesson.querySelector('.lesson-card-title').innerText;
	const content = lesson.querySelector('.lesson-card-content').innerHTML;
	const delta = quill.clipboard.convert(content);

	// switch view state
	createLessonContainer.setAttribute(
		'view',
		`edit-lesson:${lesson.getAttribute('data-id')}`,
	);
	clearBtn.removeAttribute('hidden');

	quill.setContents(delta, 'silent');
	lessonInput.value = title;
	submitLessonElement.textContent = 'UPDATE LESSON';
}

function lessonHandler(e) {
	const lessonCard = e.currentTarget;
	switch (e.target.id) {
		case 'delete':
			removeLesson(lessonCard.getAttribute('data-id'));
			return;
		case 'view':
			handleViewClick(lessonCard);
			return;
		case 'edit':
			handleEditClick(lessonCard);
			return;
	}
}

function handleViewClick(lesson) {
	const title = lesson.querySelector('.lesson-card-title').innerText;
	const content = lesson.querySelector('.lesson-card-content').innerHTML;

	modalLessonTitle.innerText = title;
	modalLessonContent.innerHTML = content;
	modalLesson.removeAttribute('hidden');
	overlay.removeAttribute('hidden');
	overlay.classList.add('dark');
}

function lessonHelper(varName, eventListener, classList, attribute, textContent, innerHTML, id) {
	if(eventListener){
		varName.addEventListener(Object.keys(eventListener)[0], Object.values(eventListener)[0]);
	}
	if(classList){
		for(let i = 0; i < classList.length; i++){
			varName.classList.add(classList[i]);
		}
	}
	if(attribute){
		for(let i = 0; i < attribute.length; i++){
			varName.setAttribute(Object.keys(attribute[i])[0], Object.values(attribute[i])[0]);
		}
	}
	if(textContent){
		varName.textContent = textContent;
	}
	if(innerHTML){
		varName.innerHTML = innerHTML;
	}
	if(id){
		varName.id = id;
	}
}

function renderLessons() {
	handleClear();
	// render lesson cards
	return db
		.collection('users')
		.doc(firebase.auth().currentUser.uid)
		.get()
		.then((snapshot) => {
			if (lessonsContainer.childElementCount) {
				lessonsContainer.innerHTML = '';
			}

			if (snapshot.data() && snapshot.data().lessons.length) {
				snapshot.data().lessons.forEach(({ title, content, id }) => {
					const lessonCard = document.createElement('div');
					lessonHelper(lessonCard, {'click': lessonHandler}, ['lesson-card'], [{'data-id': id}])

					const buttonContainer = document.createElement('div');
					lessonHelper(buttonContainer, false, ['lesson-card-content-buttons'])

					const titleContainer = document.createElement('div');
					lessonHelper(titleContainer, false, ['lesson-card-title-container'])

					const lessonTitle = document.createElement('h2');
					lessonHelper(lessonTitle, false, ['lesson-card-title'], false, title)

					const lessonContent = document.createElement('div');
					lessonHelper(lessonContent, false, ['lesson-card-content', 'ql-editor', 'ql-container'], false, false, content)

					const lessonRemoveBtn = document.createElement('button');
					lessonHelper(lessonRemoveBtn, false, ['button'], false, false, false, 'delete')

					const removeIcon = document.createElement('img');
					lessonHelper(removeIcon, false, false, [{'alt': 'remove lesson icon'}, {'src': './images/cancel-white.svg'}], false, false, 'delete')

					const editIcon = document.createElement('img');
					lessonHelper(editIcon, false, false, [{'alt': 'edit lesson icon'}, {'src': './images/edit-white.svg'}], false, false, 'edit')

					const lessonEditBtn = document.createElement('button');
					lessonHelper(lessonEditBtn, false, ['button'], false, false, false, 'edit')

					const lessonViewBtn = document.createElement('button');
					lessonHelper(lessonViewBtn, false, ['button'], false, 'VIEW LESSON', false, 'view')

					titleContainer.appendChild(lessonTitle);
					lessonRemoveBtn.appendChild(removeIcon);
					titleContainer.appendChild(lessonRemoveBtn);
					lessonCard.appendChild(titleContainer);
					lessonCard.appendChild(lessonContent);
					buttonContainer.appendChild(lessonViewBtn);
					lessonEditBtn.appendChild(editIcon);
					buttonContainer.appendChild(lessonEditBtn);
					lessonCard.appendChild(buttonContainer);
					lessonsContainer.appendChild(lessonCard);
				});
			} else {
				const noLessons = document.createElement('p');
				noLessons.classList.add('no-lessons');

				noLessons.textContent = 'No lessons :(';
				lessonsContainer.appendChild(noLessons);
			}
		});
}

function addUser(user) {
	const { uid } = user;

	db.collection('users')
		.where('uid', '==', uid)
		.get()
		.then((snapshot) => {
			const userExists = !snapshot.empty;

			if (userExists) {
				console.log('user already exists');
			} else {
				console.log('user does not exist. Adding...');
				db.collection('users')
					.doc(uid)
					.set({ uid: uid, lessons: [] })
					.catch((error) => {
						console.error('Error adding document: ', error);
					});
			}
		});
}

function addLesson(e) {
	e.preventDefault();

	const content = quill.root.innerHTML;
	const isEditView = createLessonContainer
		.getAttribute('view')
		.includes('edit-lesson');

	if (isEditView) {
		const id = createLessonContainer.getAttribute('view').split(':')[1];

		db.collection('users')
			.doc(firebase.auth().currentUser.uid)
			.get()
			.then((snapshot) => {
				const newLessons = snapshot.data().lessons.map((lesson) => {
					if (lesson.id === id) {
						lesson.title = lessonInput.value;
						lesson.content = content;
					}
					return lesson;
				});

				snapshot.ref
					.update({ lessons: newLessons })
					.then(renderLessons)
					.catch(console.log);
			});
	} else {
		db.collection('users')
			.doc(firebase.auth().currentUser.uid)
			.update({
				lessons: firebase.firestore.FieldValue.arrayUnion({
					title: lessonInput.value,
					content,
					id: String(Math.floor(Math.random() * 90000 + 10000)),
				}),
			})
			.then(() => {
				lessonInput.value = '';
				renderLessons();
			})
			.catch(console.log);
	}
}

function removeLesson(deleteId) {
	db.collection('users')
		.doc(firebase.auth().currentUser.uid)
		.get()
		.then((snapshot) => {
			const newLessons = snapshot
				.data()
				.lessons.filter((lesson) => lesson.id !== deleteId);

			snapshot.ref
				.update({ lessons: newLessons })
				.then(renderLessons)
				.catch(console.log);
		});
}

signInElement.addEventListener('click', () => {
	firebase
		.auth()
		.signInWithPopup(provider)
		.then(({ user }) => {
			init(user);
			addUser(user);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;

			console.error(`${errorCode} ${errorMessage}`);
		});
});

signOutElement.addEventListener('click', () => {
	firebase
		.auth()
		.signOut()
		.then(() => {
			console.log('signed out success');
			appContainer.setAttribute('hidden', '');
			profileElement.setAttribute('hidden', '');
			preAuthContainer.removeAttribute('hidden');
			overlay.removeAttribute('hidden');
			modal.removeAttribute('hidden');

			handleCloseLessonModal();
		})
		.catch(console.log);
});
