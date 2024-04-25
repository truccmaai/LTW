document.addEventListener("DOMContentLoaded", function() {
    const commentForm = document.querySelector('.comment-box');
    const commentList = document.querySelector('.post-common');

    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const commentText = this.querySelector('textarea[name="comment"]').value.trim();
        
        if (commentText !== '') {
            const newComment = document.createElement('div');
            newComment.classList.add('comment-list');

            newComment.innerHTML = `
                <div class="flex">
                    <div class="user">
                        <div class="user-image"><img src="anh1.jpg" alt=""></div>
                        <div class="user-meta">
                            <div class="name">Nguyễn Văn A</div>
                            <div class="day">Hôm nay</div>
                        </div>
                    </div>
                    <div class="repply">
                        <div class="like icon">0<i class="fa fa-thumbs-o-up"></i></div>
                        <div class="dislike icon"><i class="fa fa-thumbs-o-down"></i></div>
                        <div class="re-comment">Repply</div>
                    </div>
                </div>
                <div class="comment">
                    ${commentText}
                </div>
            `;

            commentList.insertBefore(newComment, this);

            this.querySelector('textarea[name="comment"]').value = '';
        }
    });

    commentList.addEventListener('click', function(event) {
        const target = event.target;

        if (target.classList.contains('fa-thumbs-o-up') || target.classList.contains('fa-thumbs-o-down')) {
            const likeElement = target.parentElement;
            const commentElement = likeElement.parentElement.parentElement.parentElement.nextElementSibling;

            let likes = parseInt(likeElement.textContent);

            if (target.classList.contains('fa-thumbs-o-up')) {
                likes++;
            }
            else if (target.classList.contains('fa-thumbs-o-down')) {
                likes++;
            }

            likeElement.textContent = likes;
        }
    });
});
