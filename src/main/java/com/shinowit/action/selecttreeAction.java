package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.dao.MenuDAO;
import com.shinowit.entity.TAuOperInfo;
import com.shinowit.entity.TreeNode;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.json.annotations.JSON;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/12/9.
 */
public class selecttreeAction extends ActionSupport {
    @Resource
    private MenuDAO menudao;

    @Resource
    private BaseDAO<TAuOperInfo> operdao;

    private List<TAuOperInfo> operlist;

    private String roleid;

    private TreeNode node;

    private String operName;

    public String selecttree(){

        operlist=operdao.myfindByHql("from TAuOperInfo where operName=?",operName);

        for(TAuOperInfo u:operlist){
            roleid=u.getTAuRoleInfoByRoleId().getRoleId();
        }

        node=menudao.queryModule(roleid);


        return SUCCESS;

    }

    public String getRoleid() {
        return roleid;
    }

    public void setRoleid(String roleid) {
        this.roleid = roleid;
    }

    public List<TAuOperInfo> getOperlist() {
        return operlist;
    }

    public void setOperlist(List<TAuOperInfo> operlist) {
        this.operlist = operlist;
    }

    public String getOperName() {
        return operName;
    }

    public void setOperName(String operName) {
        this.operName = operName;
    }


    public TreeNode getNode() {
        return node;
    }

    public void setNode(TreeNode node) {
        this.node = node;
    }

}
