deploy:
	git checkout main
	git merge develop
	git push netlify main
	git checkout develop
	copy .svelte-kit\.env .
	npm run dev