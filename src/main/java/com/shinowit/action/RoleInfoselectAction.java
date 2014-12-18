package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TAuRoleInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/12/4.
 */
public class RoleInfoselectAction extends ActionSupport{
    private List<TAuRoleInfo> rolelist;
    private int page;
    private int limit;
    private int rows;
    @Resource
    private BaseDAO<TAuRoleInfo> roledao;

    private String roleId;

    public String select(){
        if(null!=roleId){

            rolelist=roledao.queryForPage("from TAuRoleInfo u where u.roleId like \'%" + roleId + "%\'", page, limit);
            rows=rolelist.size();
            return SUCCESS;
        }

        rolelist=roledao.listAll(TAuRoleInfo.class);
        rows=roledao.listAll(TAuRoleInfo.class).size();
        return SUCCESS;
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public List<TAuRoleInfo> getRolelist() {
        return rolelist;
    }

    public void setRolelist(List<TAuRoleInfo> rolelist) {
        this.rolelist = rolelist;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }
}
