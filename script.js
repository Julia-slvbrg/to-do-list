$(document).ready(function(){
    const taskArr = [];

    const currentDate = new Date().toISOString().split('T')[0];
    $('input[type="date"]').attr('min', currentDate);


    const formatDate = (inputDate) => {
        
        const selectedDate = new Date(inputDate);

        const formattedDate = ("0" + selectedDate.getDate()).slice(-2) + "/"
                   + ("0" + (selectedDate.getMonth() + 1)).slice(-2) + "/"
                   + selectedDate.getFullYear();
        
        
        return formattedDate
    };

    $('#input-form').on('submit', function(e){
        e.preventDefault();

        const taskName = $('#new-task').val();
        const taskBeginDate = $('#task-begin-date').val();
        const taskEndDate = $('#task-end-date').val();
        const taskDescription = $('#task-description').val();

        const foramattedBeginDate = formatDate(taskBeginDate);
        const foramattedEndDate = formatDate(taskEndDate);

        if(taskEndDate<taskBeginDate){
            return alert("A data de términno não pode ser anterior a data de início.")
        };
    
        taskArr.push(taskName);
        
        const newListItem = $(`<li id="${taskArr.length}-task"></li>`);
        const taskHeader = $(`
            <div class="task-header">
                <h3 class="task-name">${taskName}</h3>
                <div class="icon-container">
                    <span class="material-symbols-outlined expand-less-icon">
                        expand_less
                    </span>
                    <span class="material-symbols-outlined expand-more-icon" >
                        expand_more
                    </span>
                </div>
            </div>
        `);
        const taskInfo = $(`
            <div class="task-info">
                <p>Data de início: ${foramattedBeginDate}</p>
                <p>Data de término: ${foramattedEndDate}</p>
                <p class="task-descripton">${taskDescription}</p>
            </div>
        `);

        taskHeader.appendTo(newListItem);
        taskInfo.appendTo(newListItem);
        newListItem.appendTo('ul');
    });

    $('ul').on('click', '.expand-more-icon', function(){
        $(this).closest('.task-header').siblings('.task-info').slideDown();
    });
    $('ul').on('click', '.expand-less-icon', function(){
        $(this).closest('.task-header').siblings('.task-info').slideUp();
    });

    $('ul').on('click', '.task-name', function(){
        $(this).toggleClass('completed');
    });

})