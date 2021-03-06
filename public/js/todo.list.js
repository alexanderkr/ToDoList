var converter = new Showdown.converter();

var ToDoItem = React.createClass({
    handleDelete: function() {
        this.props.onDelete();
    },
    render: function() {
        //var rawMarkup = converter.makeHtml(this.props.children.toString());
        var rawMarkup = this.props.children.toString();
        return (
            <tr>
                <td>{this.props.author}</td>
                <td>{rawMarkup}</td>
                <td><input type="button" onClick={this.handleDelete} className="btn btn-sm btn-default" value="Delete"/></td>
            </tr>
        );
    }
});

var CommentList = React.createClass({
        handleDeletion: function() {
            this.props.onDeleteItem();
        },
        render: function () {
            var self = this;
            var todoItems = this.props.data.map(function (comment) {
                return (
                    <ToDoItem author={comment.author} onDelete={self.handleDeletion} >
                        {comment.text}
                    </ToDoItem>
                );
            });

            return (
                <div className="panel panel-default">
                    <div className="panel-heading">Open Items</div>

                    <table className="table">
                        <tbody>
                            {todoItems}
                        </tbody>
                    </table>
                </div>
            );
        }
});

var CommentForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var author = this.refs.author.getDOMNode().value.trim();
        var text = this.refs.text.getDOMNode().value.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({author: author, text: text});
        this.refs.author.getDOMNode().value = '';
        this.refs.text.getDOMNode().value = '';
    },
    render: function() {
        return (
            <form className="form-inline" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label className="sr-only" for="exampleInputl3">Email address</label>
                    <input id="exampleInputl3" type="text" className="form-control" placeholder="Your name" ref="author"/>
                </div>
                <div className="form-group">
                    <label className="sr-only" for="exampleInputl4">Email address</label>
                    <input id="exampleInputl4" type="text" className="form-control" placeholder="Say something..." ref="text"/>
                </div>
                <button type="submit" className="btn btn-default">Create Item</button>
            </form>
        );
    }
});
var CommentBox = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleItemSubmit: function(comment) {
        var newData = this.state.data;
        newData.push(comment);
        this.setState({data: newData});
    },
    handleItemDelete: function () {
        console.log('delete')
    },
    render: function() {
        return (
            <div className="commentBox">
                <CommentList data={this.state.data} onDeleteItem={this.handleItemDelete}/>
                <CommentForm onCommentSubmit={this.handleItemSubmit}/>
            </div>
        );
    }
});

React.render(
    <CommentBox url="comments.json"/>,
    document.getElementById('content')
);