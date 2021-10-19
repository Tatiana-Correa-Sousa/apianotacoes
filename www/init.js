function salvar() {
    const id = $('#id').val();
    const titulo = $('#titulo').val();
    const anotacao = $('#anotacao').val();

    if(!titulo) return alert('Campo titulo é obrigatório!');
    if(!anotacao) return alert('Campo anotacao é obrigatório!');

    const type = !id ? 'post' : 'put'

    $.ajax({
        type: type,  // http method
        url: '/notes',
        data: JSON.stringify({title: titulo,
                              description: anotacao,
                              id: id}),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            alert(data.message);
            $('#titulo').val('');
            $('#anotacao').val('');
            $('#id').val('');
            listar ();
        },
        error: function (res) {
            alert(res.responseJSON.message);
        }
    });
}

function listar () {
    $('.list').html('');
    $.ajax({
        type: 'GET',  // http method
        url: '/notes',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data);
            for (const note of data) {
                $('.list').append(`
                    <div class="item">
                        <h2>${note.title}</h2>
                        <p>${note.description}</p>
                        <button onclick="excluir('${note.id}')">Excluir</button>
                        <button onclick="editar('${note.id}')">Editar</button>
                    </div>
                `)
            }
        },
        error: function (res) {
            alert(res.responseJSON.message);
        }
    });
}

listar();

function excluir(id) {
    $.ajax({
        type: 'DELETE',  // http method
        url: '/notes',
        data: JSON.stringify({id: id}),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            alert(data.message);
            listar ();
        },
        error: function (res) {
            alert(res.responseJSON.message);
        }
    });
}

function editar(id) {
    $.ajax({
        type: 'GET',  // http method
        url: '/notes/' + id,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $('#titulo').val(data.title);
            $('#anotacao').val(data.description);
            $('#id').val(data.id);
        },
        error: function (res) {
            alert(res.responseJSON.message);
        }
    });
}